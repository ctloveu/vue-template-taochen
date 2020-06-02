/*
 * @name 组件名字
 * @decripton 组件功能描述
 * @img 组件图片名称    必须放在public/componentDescrptImg文件夹中
 * @url 组件被使用网页例子路由
 */
import { ImgComponentDescription as img} from '@/utils/index'

export const data = [{
	name: '未开发提示组件',
	decripton: '提示该功能模块没有开发',
	img: img('undone.jpg'),
	url: '/activitySecurity/undonePage',
}]
