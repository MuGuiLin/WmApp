/**
 * 日期格式化
 */
export const FormatDate = (time, str) => {
	let date = new Date(time);
	if (/(y+)/.test(str)) {
		str = str.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));	//年份
	}
	
	let obj = {
		'M+': date.getMonth() + 1,						//月份
		'd+': date.getDate(),							//日
		'h+': date.getHours(),							//小时
		'm+': date.getMinutes(),						//分
		's+': date.getSeconds(),						//秒
		'q+': Math.floor((date.getMonth() + 3) / 3),	//季度   
		'S': date.getMilliseconds()            			//毫秒
	};
	
	for (let k in obj) {
		if (new RegExp(`(${k})`).test(str)) {
			str = str.replace(RegExp.$1, (RegExp.$1.length === 1) ? obj[k] : ('00' + obj[k]).substr(('' + obj[k]).length));   
		}
	}
	return str;
};
