const axios=require('axios');

var qs = require('qs');  //post 传参需要引入该库?

const baseUrl="http://localhost/basic/web/index.php?r=site";
class Book {
    constructor() {
        this.books=null;
    }
    

/**
 * 获取图书列表
 */
 getBookList(pageNumber) {
     return axios.get(`${baseUrl}/get-books`);
}

/**
 * 删除图书
 */
 deleteBookById(id) {
    return axios.get(`${baseUrl}/delete-book`,{params:{id}});
}

/**
 * 获取单个图书
 */
 getBookDetailById(id) {
    return axios.get(`${baseUrl}/get-book`,{params:{id}});

}

/**
 * 创建、更新图书
 */
 createOrUpdateBookById(data) {

    return axios.post(`${baseUrl}/edit-book`,qs.stringify(data));

}

}

module.exports=Book;