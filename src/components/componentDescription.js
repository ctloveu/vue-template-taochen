//描述功能组件有哪些，方便团队统一开发和调度
/*
 * @name 组件名字
 * @decripton 组件功能描述
 * @img 组件图片名称    必须放在public/componentDescrptImg文件夹中
 * @url 组件被使用网页例子路由
 * @active 用于后续组价是否被筛选中
 */
function ImgComponentDescription(v) {
	return require('@/assets/componentDescrptImg/' + v)
}

export const data = [{
	name: 'undoneHint',
	decripton: '提示该功能模块没有开发',
	img: ImgComponentDescription('undone.jpg'),
	url: '/activitySecurity/undonePage',
	active: false
}]
