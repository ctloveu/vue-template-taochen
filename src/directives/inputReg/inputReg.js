export default function inserted(el, validateStr) {
  //  console.log(el.offsetLeft)
  //拆分验证规则
  var validateRuleArr = []
  if (validateStr.value) {
    validateRuleArr = validateStr.value.split("|")
  }
  //监听失去焦点的时候
  el.addEventListener('blur', function () {
    if (validateStr.value) {
      checkedfun()
    }
  })

  //循环进行验证
  function checkedfun() {
    for (var i = 0; i < validateRuleArr.length; i++) {
      let requireReg = /^require$/ //判断设置验了required
      let numReg = /^num$/ //判断设置了数字验证
      let numTipReg = /^numTip$/ //判断设置了数字验证和提示验证结果
      let idcardReg = /^idcard$/ //判断设置sfzhm
      let idcardTipReg = /^idcardTip$/ //判断设置sfzhm和提示验证结果
      let phoneReg = /^phone$/ //判断设置验证phone
      let phoneTipReg = /^phoneTip$/ //判断设置验证phone和提示验证结果
      let emailReg = /^email$/ //判断设置验证email
      let emailTipReg = /^emailTip$/ //判断设置验证phone和提示验证结果
      /* let chnReg = /^chn$/ //判断设置验证全部为中文
      let chnTipReg = /^chnTip$/ //判断设置验证全部为中文和提示验证结果 */

      // 验证是否必填
      if (requireReg.test(validateRuleArr[i])) {
        if (!required()) {
          break;
        } else {
          removeTips()
        }
      }

      // 验证是否正整数
      if (numReg.test(validateRuleArr[i])) {
        if (!isNum(0)) {
          break;
        } else {
          removeTips()
        }
      }

      if (numTipReg.test(validateRuleArr[i])) {
        if (!isNum(1)) {
          break;
        } else {
          removeTips()
        }
      }

      // 验证是否身份证号码
      if (idcardReg.test(validateRuleArr[i])) {
        if (!idcard(0)) {
          break;
        } else {
          removeTips()
        }
      }

      if (idcardTipReg.test(validateRuleArr[i])) {
        if (!idcard(1)) {
          break;
        } else {
          removeTips()
        }
      }

      // 验证是否手机号
      if (phoneReg.test(validateRuleArr[i])) {
        if (!phone(0)) {
          break;
        } else {
          removeTips()
        }
      }

      if (phoneTipReg.test(validateRuleArr[i])) {
        if (!phone(1)) {
          break;
        } else {
          removeTips()
        }
      }

      // 验证是否手机号
      if (emailReg.test(validateRuleArr[i])) {
        if (!email(0)) {
          break;
        } else {
          removeTips()
        }
      }

      if (emailTipReg.test(validateRuleArr[i])) {
        if (!email(1)) {
          break;
        } else {
          removeTips()
        }
      }

      // 验证是否全为中文
      /* if (chnReg.test(validateRuleArr[i])) {
        if (!chn(0)) {
          break;
        } else {
          removeTips()
        }
      }
 
      if (chnTipReg.test(validateRuleArr[i])) {
        if (!chn(1)) {
          break;
        } else {
          removeTips()
        }
      } */

    }
  }

  function required() {
    if (el.value == "" || el.value.trim() == "" || el.value == null) {
      tipMsg("不能为空!")
      return false
    }
    return true
  }

  function isNum(t) {
    let reg = /^\+?[1-9][0-9]*$/
    if (!reg.test(el.value)) {
      el.value = ''
      if (t === 1) {
        tipMsg('请输入数字!')
      }
      return false
    }
    return true
  }

  function idcard(t) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(el.value)) {
      el.value = ''
      if (t === 1) {
        tipMsg('请输入正确的身份证号码!')
      }
      return false
    }
    return true
  }

  function phone(t) {
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!reg.test(el.value)) {
      el.value = ''
      if (t === 1) {
        tipMsg('请输入正确的手机号码!')
      }
      return false
    }
    return true
  }

  function email(t) {
    let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if (!reg.test(el.value)) {
      el.value = ''
      if (t === 1) {
        tipMsg('请输入正确的邮箱!')
      }
      return false
    }
    return true
  }

  /* function chn(t) {
    let reg = /^[/u4E00-/u9FA5]+$/
    if (!reg.test(el.value)) {
      el.value = ''
      if (t === 1) {
        tipMsg('请输入正确的中文!')
      }
      return false
    }
    return true
  } */

  // 添加提示
  function tipMsg(msg) {
    removeTips();
    let tipsDiv = document.createElement("div")
    let curDate = Date.parse(new Date())
    tipsDiv.innerText = msg
    tipsDiv.className = "tipsDiv"
    tipsDiv.id = curDate
    tipsDiv.style.position = "absolute"
    tipsDiv.style.top = el.offsetTop + '45' + 'px'
    tipsDiv.style.left = el.offsetLeft + 'px'
    document.body.appendChild(tipsDiv)
  }

  // 移除提示
  function removeTips() {
    if (document.getElementsByClassName('tipsDiv')[0]) {
      document.getElementsByClassName('tipsDiv')[0].remove()
    }
  }

}