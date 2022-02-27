// 引入mock模块
import Mock from 'mockjs'
// 把json数据格式引入[JSON数据格式根本没有对外暴露，但可以直接引入]
// webpack默认对外暴露的有图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'
// mock数据:第一个参数是请求地址 第二个参数:请求地址相应的数据
// 模拟首页大轮播图的数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
