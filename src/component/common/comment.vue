<template>
    <section class="comment">
        <div class="mui-card">
            <div class="mui-card-header">
                <h3>提交评论</h3>
            </div>
            <div class="mui-card-content">
                <textarea v-model="content" id="textarea" rows="5" placeholder="请输入评论内容"></textarea>
                <button type="button" @click="submitComment" class="mui-btn mui-btn-success mui-btn-block">发表</button>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">
                <h3>评论列表</h3>
            </div>
            <div class="mui-card-content">
                <ul class="mui-table-view">
                    <li v-for="(item, i) in list" :key="i" class="mui-table-view-cell">
                        <div>
                            <span>第{{i+1}}楼</span>
                            <span>用户:{{item.user_name}}</span>
                            <span>发表时间:{{ item.add_time | formatDate }} </span>
                        </div>
                        <p>{{item.content}}</p>
                    </li>
                    <button ref="loadMoreBtn" type="button" @click="getComment" class="mui-btn mui-btn-success mui-btn-block">加载更多</button>
                </ul>
            </div>
        </div>
    </section>
</template>
<script>
import config from '../../js/config.js';
import { Toast } from 'mint-ui';
export default ({
    props: ['id'],
    data() {
        return {
            content: '',
            pageindex: 1,
            list: []
        }
    },
    methods: {
        submitComment() {
            let url = config.commentPut + this.id;
            let data = { content: this.content };
            this.$http.post(url, data, { emulateJSON: true }).then(rep => {
                if (rep.body.status == 0) {
                    this.content = '',
                        Toast({
                            message: '操作成功',
                            iconClass: 'icon icon-success'
                        });
                    this.list.unshift({
                        user_name: '匿名用户',
                        add_time: Date.now(),
                        content: this.content
                    });
                    this.content='';
                }
            })
        },
        getComment() {
            let url = `${config.commentList + this.id}?pageindex=${this.pageindex}`;
            this.$http.get(url).then(rep => {
                if (rep.body.status == 0 && rep.body.message.length > 0) {
                    this.list.push(...rep.body.message);
                    this.pageindex++;
                } else {
                    this.$refs.loadMoreBtn.disabled = true;
                }
            })
        }
    },
    created() {
        this.getComment();
    }
})
</script>
<style lang="less">
.comment {
    .mui-card-content {
        padding: 4px 8px;
        p {
            background-color: rgba(0, 0, 0, .3);
            color: #333;
        }
    }
    .mui-btn-success {
        background-color: #1be4db;
        border-color: #1be4db;
    }
}
</style>
