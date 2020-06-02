// import '@public/commonJs/janus/adapter.min.js';
import {Janus} from '@public/commonJs/janus/janus.js';
import { option } from 'runjs';

var WebRtc = function (options) {
    var server = options.server || 'https://59.1.88.188:8443/janus';
    // if(window.location.protocol === 'http:'){
    //     server = "http://" + window.location.hostname + ":8088/janus";
    // } else{
    //     server = "https://" + window.location.hostname + ":8089/janus";
    // }
    
    var myroom = 1234;	// Demo room
    var opaqueId = "videoroomtest-" + Janus.randomString(12);
    var mypvtid = null;
    var myusername = null;
    var mystream = null;
    var myid = null;
    var janus = null;
    var sfutest = null;
    var feeds = [];
    var bitrateTimer = [];

    var printLog = false//是否打印此文件代码的日志

    this.init = init
    this.registerUsername = registerUsername
    this.createRoom = createRoom
    this.close = close
    this.mute = mute
    this.unmute = unmute

    //初始化
    function init() {
        if (!checkWebRtcUseful) {
            myerror('当前环境不支持webRTC')
            return
        }
        Janus.init({
            debug: "all",
            callback: function () {
                // Create session
                janus = new Janus({
                    server: server,
                    success: function () {
                        // Attach to video room test plugin
                        janus.attach({
                            plugin: "janus.plugin.videoroom",
                            opaqueId: opaqueId,
                            success: function (pluginHandle) {
                                sfutest = pluginHandle;
                                // janus.destroy();
                                if(options.inited){
                                    options.inited()
                                }
                            },
                            error: function (error) {
                            },
                            consentDialog: function (on) {
                            },
                            mediaState: function (medium, on) {
                            },
                            webrtcState: function (on) {
                                if (!on) {
                                    return
                                }
                                // sfutest.send({ "message": { "request": "configure", "bitrate": bitrate } });
                            },
                            onmessage: function (msg, jsep) {
                                var event = msg["videoroom"];
                                if (event != undefined && event != null) {
                                    if (event === "joined") {
                                        // Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
                                        myid = msg["id"];
                                        mypvtid = msg["private_id"];
                                        publishOwnFeed(true);
                                        // Any new feed to attach to?
                                        if (msg["publishers"] !== undefined && msg["publishers"] !== null) {
                                            var list = msg["publishers"];
                                            if(list.length>0 && list[0]){
                                                var f=0
                                                var id = list[f]["id"];
                                                var display = list[f]["display"];
                                                var audio = list[f]["audio_codec"];
                                                var video = list[f]["video_codec"];
                                                newRemoteFeed(id, display, audio, video);
                                            }
                                            // for (var f in list) {
                                            //     var id = list[f]["id"];
                                            //     var display = list[f]["display"];
                                            //     var audio = list[f]["audio_codec"];
                                            //     var video = list[f]["video_codec"];
                                            //     newRemoteFeed(id, display, audio, video);
                                            // }
                                        }
                                    } else if (event === "destroyed") {
                                        //
                                    } else if (event === "event") {
                                        // Any new feed to attach to?
                                        if (msg["publishers"] !== undefined && msg["publishers"] !== null) {
                                            var list = msg["publishers"];
                                            if(list.length>0 && list[0]){
                                                var f=0
                                                var id = list[f]["id"];
                                                var display = list[f]["display"];
                                                var audio = list[f]["audio_codec"];
                                                var video = list[f]["video_codec"];
                                                newRemoteFeed(id, display, audio, video);
                                            }
                                            // for (var f in list) {
                                            //     var id = list[f]["id"];
                                            //     var display = list[f]["display"];
                                            //     var audio = list[f]["audio_codec"];
                                            //     var video = list[f]["video_codec"];
                                            //     newRemoteFeed(id, display, audio, video);
                                            // }
                                        } else if (msg["leaving"] !== undefined && msg["leaving"] !== null) {
                                            //对方挂断时关闭通话
                                            if(options.closeTalkingPage){
                                                options.closeTalkingPage()
                                            }
                                            // One of the publishers has gone away?
                                            // var leaving = msg["leaving"];
                                            // var remoteFeed = null;
                                            // for (var i = 1; i < 6; i++) {
                                            //     if (feeds[i] != null && feeds[i] != undefined && feeds[i].rfid == leaving) {
                                            //         remoteFeed = feeds[i];
                                            //         break;
                                            //     }
                                            // }
                                            // if (remoteFeed != null) {
                                            //     feeds[remoteFeed.rfindex] = null;
                                            //     remoteFeed.detach();
                                            // }
                                        } else if (msg["unpublished"] !== undefined && msg["unpublished"] !== null) {
                                            //对方挂断时关闭通话
                                            if(options.closeTalkingPage){
                                                options.closeTalkingPage()
                                            }

                                            // One of the publishers has unpublished?
                                            // var unpublished = msg["unpublished"];
                                            // if (unpublished === 'ok') {
                                            //     sfutest.hangup();
                                            //     return;
                                            // }
                                            // var remoteFeed = null;
                                            // for (var i = 1; i < 6; i++) {
                                            //     if (feeds[i] != null && feeds[i] != undefined && feeds[i].rfid == unpublished) {
                                            //         remoteFeed = feeds[i];
                                            //         break;
                                            //     }
                                            // }
                                            // if (remoteFeed != null) {
                                            //     feeds[remoteFeed.rfindex] = null;
                                            //     remoteFeed.detach();
                                            // }
                                        } else if (msg["error"] !== undefined && msg["error"] !== null) {
                                            if (msg["error_code"] === 426) {
                                                myerror('连接失败')
                                            } else {
                                                myerror(msg["error"])
                                            }
                                        }
                                    }
                                }
                                if (jsep !== undefined && jsep !== null) {
                                    sfutest.handleRemoteJsep({ jsep: jsep });
                                    var audio = msg["audio_codec"];
                                    if (mystream && mystream.getAudioTracks() && mystream.getAudioTracks().length > 0 && !audio) {
                                        myerror("Our audio stream has been rejected, viewers won't hear us");
                                    }
                                    var video = msg["video_codec"];
                                    if (mystream && mystream.getVideoTracks() && mystream.getVideoTracks().length > 0 && !video) {
                                        myerror("Our video stream has been rejected, viewers won't see us");
                                    }
                                }
                            },
                            onlocalstream: function (stream) {
                                mystream = stream;
                                // Janus.attachMediaStream($('#myvideo').get(0), stream);
                                var myvideo = document.getElementById('myvideo')
                                myvideo.srcObject = stream
                                $('#myvideo').get(0).muted = 'muted'
                                if (sfutest.webrtcStuff.pc.iceConnectionState !== "completed" &&
                                    sfutest.webrtcStuff.pc.iceConnectionState !== "connected") {
                                    //Publishing...
                                }
                                var videoTracks = stream.getVideoTracks();
                                if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
                                    // No webcam available
                                } else {
                                    // ?
                                }
                            },
                            onremotestream: function (stream) {
                                // The publisher stream is sendonly, we don't expect anything here
                            },
                            oncleanup: function () {
                                mystream = null;
                            }
                        });
                    },
                    error: function (error) {
                        myerror(error);
                    },
                    destroyed: function () {
                        //
                    }
                });
            }
        });
    }

    // 打印日志
    function mylog() {
        if(printLog){
            mylog(arguments)
        }
    }
    // 打印报错
    function myerror() {
        mylog(arguments)
    }

    //注册用户名
    function registerUsername(userName, p) {
        var register = { "request": "join", "room": p, "ptype": "publisher", "display": userName };
        myusername = userName;
        sfutest.send({ "message": register });
    }

    //注册房间
    function createRoom() {
        var msg = {
            "request" : "create",
            "permanent" : false
        };
        sfutest.send({ 
            "message": msg ,
            success(p){
                if(options.useDefaultRoomId){
                    myroom = 1234
                    console.log('use default room id:1234')
                    options.roomCreated(myroom)
                    return
                }
                if(options.roomCreated){
                    myroom = p.room
                    console.log('******************room created: '+p.room)
                    options.roomCreated(p.room)
                }
            }
        });
    }

    //关闭
    function close() {
        janus.destroy();
    }

    //静音
    function mute() {
        var muted = sfutest.isAudioMuted();
        if(!muted){
            sfutest.muteAudio();
        }
        showIsMuted()
    }
    //取消静音
    function unmute() {
        var muted = sfutest.isAudioMuted();
        if(muted){
            sfutest.unmuteAudio();
        }
        showIsMuted()
    }
    //打印当前是否静音
    function showIsMuted() {
        var muted = sfutest.isAudioMuted();
        console.log('当前是否静音:' +  muted);
    }

    //发布当前视频流
    function publishOwnFeed(useAudio) {
        // Publish our stream
        sfutest.createOffer({
            media: { audioRecv: false, videoRecv: false, audioSend: useAudio, videoSend: true },	// Publishers are sendonly
            // simulcast: doSimulcast,
            // simulcast2: doSimulcast2,
            success: function (jsep) {
                var publish = { "request": "configure", "audio": useAudio, "video": true };
                sfutest.send({ "message": publish, "jsep": jsep });
            },
            error: function (error) {
                myerror("WebRTC error:", error);
                if (useAudio) {//视频不可用重试仅音频
                    publishOwnFeed(false);
                }
            }
        });
    }
    //取消发布当前视频流
    function unpublishOwnFeed() {
        var unpublish = { "request": "unpublish" };
        sfutest.send({ "message": unpublish });
    }

    //检查当前环境webrtc是否可用
    function checkWebRtcUseful() {
        return Janus.isWebrtcSupported()
    }

    //获取远程流
    function newRemoteFeed(id, display, audio, video) {
        var remoteFeed = null;
        janus.attach({
            plugin: "janus.plugin.videoroom",
            opaqueId: opaqueId,
            success: function (pluginHandle) {
                remoteFeed = pluginHandle;
                remoteFeed.simulcastStarted = false;
                mylog("Plugin attached! (" + remoteFeed.getPlugin() + ", id=" + remoteFeed.getId() + ")");
                mylog("  -- This is a subscriber");
                // We wait for the plugin to send us an offer
                var subscribe = { "request": "join", "room": myroom, "ptype": "subscriber", "feed": id, "private_id": mypvtid };
                if (Janus.webRTCAdapter.browserDetails.browser === "safari" &&
                    (video === "vp9" || (video === "vp8" && !Janus.safariVp8))) {
                    if (video)
                        video = video.toUpperCase()
                    mylog("Publisher is using " + video + ", but Safari doesn't support it: disabling video");
                    subscribe["offer_video"] = false;
                }
                remoteFeed.videoCodec = video;
                remoteFeed.send({ "message": subscribe });
            },
            error: function (error) {
                myerror("  -- Error attaching plugin...", error);
            },
            onmessage: function (msg, jsep) {
                var event = msg["videoroom"];
                if (msg["error"] !== undefined && msg["error"] !== null) {
                    myerror(msg["error"]);
                } else if (event != undefined && event != null) {
                    if (event === "attached") {
                        // Subscriber created and attached
                        for (var i = 1; i < 6; i++) {
                            if (feeds[i] === undefined || feeds[i] === null) {
                                feeds[i] = remoteFeed;
                                remoteFeed.rfindex = i;
                                break;
                            }
                        }
                        remoteFeed.rfid = msg["id"];
                        remoteFeed.rfdisplay = msg["display"];
                        mylog("Successfully attached to feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") in room " + msg["room"]);
                    } else if (event === "event") {
                        // Check if we got an event on a simulcast-related event from this publisher
                        var substream = msg["substream"];
                        var temporal = msg["temporal"];
                        if ((substream !== null && substream !== undefined) || (temporal !== null && temporal !== undefined)) {
                            if (!remoteFeed.simulcastStarted) {
                                remoteFeed.simulcastStarted = true;
                                // Add some new buttons
                                //addSimulcastButtons(remoteFeed.rfindex, remoteFeed.videoCodec === "vp8" || remoteFeed.videoCodec === "h264");
                            }
                            // We just received notice that there's been a switch, update the buttons
                            //updateSimulcastButtons(remoteFeed.rfindex, substream, temporal);
                        }
                    } else {
                        // What has just happened?
                    }
                }
                if (jsep !== undefined && jsep !== null) {
                    // Answer and attach
                    remoteFeed.createAnswer({
                        jsep: jsep,
                        // Add data:true here if you want to subscribe to datachannels as well
                        // (obviously only works if the publisher offered them in the first place)
                        media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
                        success: function (jsep) {
                            var body = { "request": "start", "room": myroom };
                            remoteFeed.send({ "message": body, "jsep": jsep });
                        },
                        error: function (error) {
                            myerror("WebRTC error:", error);
                        }
                    });
                }
            },
            webrtcState: function (on) {
                mylog("Janus says this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") is " + (on ? "up" : "down") + " now");
            },
            onlocalstream: function (stream) {
                // The subscriber stream is recvonly, we don't expect anything here
            },
            onremotestream: function (stream) {
                // Janus.attachMediaStream($('#remotevideo').get(0), stream);
                var myvideo = document.getElementById('remotevideo')
                myvideo.srcObject = stream
                if(options.connected){//获取到远程视频流才算作连接成功
                    options.connected()
                }
                if (Janus.webRTCAdapter.browserDetails.browser === "chrome" || Janus.webRTCAdapter.browserDetails.browser === "firefox" ||
                    Janus.webRTCAdapter.browserDetails.browser === "safari") {
                    bitrateTimer[remoteFeed.rfindex] = setInterval(function () {
                        var bitrate = remoteFeed.getBitrate();
                        var width = $("#remotevideo").get(0).videoWidth;
                        var height = $("#remotevideo").get(0).videoHeight;
                        mylog('bitrateTimer',width,height,bitrate)
                    }, 1000);
                }
            },
            oncleanup: function () {
                remoteFeed.spinner = null;
                if (bitrateTimer[remoteFeed.rfindex] !== null && bitrateTimer[remoteFeed.rfindex] !== null)
                    clearInterval(bitrateTimer[remoteFeed.rfindex]);
                bitrateTimer[remoteFeed.rfindex] = null;
                remoteFeed.simulcastStarted = false;
            }
        });
    }
}

export {
    WebRtc
}
