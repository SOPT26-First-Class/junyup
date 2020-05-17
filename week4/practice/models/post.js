const pool = require('../modules/pool');

// 로그인 됐다는 가정,,

const table = 'POST';
// 모든 post 가져오기
const post = {
    getPosts: (uid) => {
        try {
            let uid, query;
            const quey = 'SELECT * FROM POST';
            const posts = await pool.queryParam(query);
            return posts;
        } catch(e) {
            throw e;
        }
    },
    getPostById: (id) => {
        try {
            const query = `SELECT * FROM ${table} WHERE postIdx=${req.params.id}`;
            const post = await pool.queryParam(query);
            if (post.length == 0) return -1;
            return post[0];
        } catch(e) {
            throw e;
        }
    },
    getPostsByUserId:(uid) => {
        try {
            const quey = `SELECT * FROM ${table} WHERE userIdx=${uid}`;
            const posts = await pool.queryParam(query);
            return posts;
        } catch(e) {
            throw e;
        }
    },
    create: (uid, title, contents) => {
        try {
            const query = `INSERT INTO ${table} (userIdx, title, contents, createdAt, updatedAt) VALUES (?,?,?,?,?,?)`;
            const time = new Date().getTime();
            const values = [uid, title, contents, time, time];
            const res = await pool.queryParamArr(query, values);
            return res;
        } catch(e) {
            throw e;
        }
    },
    update: (id, items) => {
        try {
            const query = `UPDATE ${table} SET`;
            for (let [k, v] of Object.entries(items)) {
                query += ` ${k}=${v},`;
            }
            query += ` updatedAt=${new Date().getTime()} WHERE postIdx=${id};`;
            const res = await pool.queryParam(query);
            return res;
        } catch(e) {
            throw e;
        }
    },
    delete: (id, uid) => {
        try {
            const query = `DELETE FROM ${table} WHERE postIdx=${id} and userIdx=${uid}`;
            const post = await pool.queryParam(query);
            return res;
        } catch(e) {
            throw e;
        }
    },
    

}


module.exports = post;