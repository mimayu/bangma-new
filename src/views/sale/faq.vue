<template>
<div class="faq_container">
        <Row class="header">
            <Col span="24" class="search_bar">
                <Search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    @search="handleSearch"
                >
                    <div slot="action" @click="handleSearch">搜索</div>
                </Search>
            </Col>
        </Row>
		<div id="questions">

            <List
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="handleLoad"
                >
			<div class="queueItem" v-for="(item,index) of list" :key="index" @click="titleClick(index)" :class="item.open?'active':''">
				<div class="title">
					{{item.content}}
					<img src="../../assets/img/41.jpg" class="icon">
				</div>
				<div class="answer" :id="item.pid"  v-if="item.open != null">
					<div v-for="(item2,index2) of item.answerlist" :key="index2" style="white-space:pre-line">
                        {{item2.content}}
                    </div>
                    <Button type="primary" size="large" @click="handleAnswerClick(item.id)">回答</Button>
				</div>

				<div class="answer" :id="item.pid"  v-else>
					<div v-for="(item2,index2) of item.answerlist" :key="index2" style="white-space:pre-line">
                        {{item2.content}}
                    </div>
                    <Button type="primary" size="large" @click="handleAnswerClick(item.id)">回答</Button>
				</div>

			</div>

            </List>


            <Button type="danger" size="large" @click="handleClick()">提问</Button>

            <footerNav class="footer"></footerNav>
		</div>
</div>
</template>
<script>
    import { Cell, CellGroup, Popup, Row, Col, Button, Field, Toast, Search, Picker, List } from 'vant';
    import { getQuestions } from '@/server';
    import footerNav from "../../components/footerNav"; // 引入页脚
    export default {
        name: 'questions',
        components: {
            Cell,
            CellGroup,
            Popup,
            Row,
            Col,
            Button,
            Field,
            Toast,
            Search,
            Picker, 
            List,
            footerNav: footerNav
        },
        data() {
            return {
                    defaultOp: -1,
                    value:"",
					title: "",
					list: [],
                    page: 1,
                    loading: false,
                    finished: false,
            };
        },
        created() {
            this.active = this.$route.params.active || this.$route.query.active || 0;
        },
        mounted: function() {
            //this.getData();
        },
		methods: {

            handleClick(){
                this.$router.push(
                    {
                        name: "question"
                    }
                )
            },
            handleAnswerClick(id){
                this.$router.push(
                    {
                        name: "answer",
                        query: {
                            iQuestionId: id
                        }
                    }
                )
            },

            /*
            * 初始化数据加载
            */
            getQuestions() {
                var that = this;
                let params = {
                    page: this.page,
                }
                getQuestions(params).then(
                    res => {
                        if(res.success == 1) {
 
                           if(res.list) {
                                var list = res.list;
                                var arr = [];
                                for(var i = 0; i < list.length; i++) {
                                    var obj = list[i];
                                    obj["open"] = null;
                                    obj["pid"] = "itemPId" + i;
                                    arr.push(obj);
                                }
                                that.list = arr;
                            }
                            this.page += 1;
                            this.loading = false;
                            if(res.list.length == 0) {
                                this.finished = true;
                            }
                        }else {
                            Toast(res.msg);
                        }
                    }
                )
            },
            /*
            * 加载数据
            */
            handleLoad() {
                var that = this;
                let params = {
                    page: this.page,
                }
                getQuestions(params).then(
                    res => {
                        if(res.success == 1) {
                            this.list = this.list.concat(res.list);

                            if(this.list) {
                                var list = this.list;
                                var arr = [];
                                for(var i = 0; i < list.length; i++) {
                                    var obj = list[i];
                                    obj["open"] = null;
                                    obj["pid"] = "itemPId" + i;
                                    arr.push(obj);
                                }
                                that.list = arr;
                            }
                            //console.log(that.list);

                            this.page += 1;
                            this.loading = false;
                            if(res.list.length == 0) {
                                this.finished = true;
                            }
                        }
                    }
                )
            },
            /*
            * 重置
            */
            reset() {
                this.list = [];
                this.loading = true;
                this.finished = false;
                this.page = 1;
            },


            /*
            * 处理搜索
            */
            handleSearch() {
                var that = this;
                let params = {
                    'page': 1,
                    'keywords': this.value,
                }
                getQuestions(params).then(
                    res => {
                        if(res.success == 1) {

                           if(res.list) {
                                var list = res.list;
                                var arr = [];
                                for(var i = 0; i < list.length; i++) {
                                    var obj = list[i];
                                    obj["open"] = null;
                                    obj["pid"] = "itemPId" + i;
                                    arr.push(obj);
                                }
                                that.list = arr;
                            }


                            this.page += 1;
                            this.loading = false;
                            if(res.list.length == 0) {
                                this.finished = true;
                            }
                        }else {
                            Toast(res.msg);
                        }
                    }
                )
            },

					titleClick: function(index) {
						var obj = this.list[index];
						obj.open = !obj.open;
						this.list[index] = obj;
						setTimeout(function() {
							var pid = "itemPId" + index;
							var pdom = document.getElementById(pid);
							if(obj.open) {
								pdom.style.height = pdom.scrollHeight + "px";
							} else {
								pdom.style.height = 0;
							}
						}, 1);
					}
				},

        }
		</script>



		<style lang="scss">
        html {
            font-size:50px;
        }

    .faq_container {
        background-color: #f6f6f6;
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title, .van-cell__value{
            text-align: left;
        }
        .btn_wrap {
            justify-content: flex-end;
            button {
                margin: 4px;
            }
        }
        .assign_btn {
            padding: 6px 8px;
            margin-left: 9px;
            border: 1px solid #ebedf0;
            border-radius: 10px;
            outline: none;
            color: #333;
            background: #fff;
        }
        .custom_wrap {
            display: flex;
        }
        .order_id {
            flex: 1;
        }
        .status {
            width: 60px;
            text-align: center;
        }
        .group {
            margin-bottom: 8px;
        }
        .empty {
            font-size: 14px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3D(-50%, -50%, 0);
        }

        .title {
            line-height: 0.9rem;
            font-size: 0.32rem;
            color: #1b1b1b;
            padding: 0 0.24rem;
            position: relative;
            border-bottom: 1px solid #efefef;
        }
        
        .title .icon {
            position: absolute;
            right: 0.24rem;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            width: 0.24rem;
            display: block;
            transition: 0.5s;
        }
        .queueItem .active .title .icon {
            -webkit-transform: translateY(-50%) rotateZ(-180deg);
            transform: translateY(-50%) rotateZ(-180deg);
        }
        
        .answer {
            height: 0;
            transition: height 0.5s;
            box-sizing: border-box;
            overflow: hidden;
        }
        
        .answer>div {
            padding: 0.4rem 0.24rem;
            font-size: 0.3rem;
            color: #9a9a9a;
            line-height: 0.42rem;
            border-bottom: 1px solid #efefef;
            cursor: pointer;
        }

    }
		</style>