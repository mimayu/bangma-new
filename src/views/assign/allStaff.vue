<template>
    <div class="allStaff_container">
        <Row class="header">
            <Col span="6">
                <Cell title="筛选" is-link arrow-direction="down" @click="choseType"/>
            </Col>
            <Col span="18" class="search_bar">
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
        <div class="content">
            <List
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="handleLoad"
                >
            <Cell-group class="group" v-for="item in staffLists" :key="item.iId">
                <Cell :title="item.sName" :value="item.sMobilePhone" />
            </Cell-group>
            </List> 
        </div>
        <Popup v-model="typeShow" position="bottom">
            <Picker show-toolbar :columns="typeLists" @cancel="handleTypeCancel" @confirm="handleTypeComfirm" />
        </Popup>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { getAllStaff } from '@/server';
    import { Cell, CellGroup, Popup, Row, Col, Picker, Toast, Search, List } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'allStaff',
        components: {
            Cell,
            CellGroup,
            Popup,
            Picker,
            Row,
            Col,
            Toast,
            Search,
            List,
            footerNav
        },
        data() {
            return {
                staffLists: [],
                typeShow: false,
                typeLists: [ 
                    '业务部',
                    '工程部',
                    '内勤',
                    '人事',
                    '财务'
                ],
                value: '', // 搜索内容
                type: '', // 删选类型
                page: 1, // 页数
                loading: false, 
                finished: false,
            };
        },
        methods: {
            /*
            * 滚动加载
            */
            handleLoad() {
                this.getAllStaff();
            },
            getAllStaff() {
                let params = {
                    'page': this.page,
                    'keyword': this.value,
                }
                getAllStaff(params).then(
                    res => {
                        if(res.success == 1) {
                            this.staffLists = this.staffLists.concat(res.list);
                            this.loading = false;
                            this.page += 1;
                            if(res.list.length == 0) {
                                this.finished = true;
                            }
                        }
                        console.log('res', res);
                    }
                )
            },
            /*
            * 处理搜索
            */
            handleSearch() {

                let params = {
                    'page': 1,
                    'keyword': this.value,
                }
                getAllStaff(params).then(
                    res => {
                        if(res.success == 1) {
                            this.staffLists = res.list;
                            this.loading = false;
                            this.page += 1;
                            if(res.list.length == 0) {
                                this.finished = true;
                            }
                        }
                    }
                )
            },
            /*
            * 处理选择
            */
            choseType() {
                this.typeShow = true;
            },
            handleTypeComfirm(value) {
                this.type = value;
                this.typeShow = false;
            },
            handleTypeCancel() {
                this.typeShow = false;
            },
        }
    }
</script>

<style lang="scss">
    .allStaff_container {
        background-color: #f6f6f6;
        .search_bar {
            display: flex;
            align-items: center;
            height: 44px;
            background: #fff;
        }
        .van-search {
            background: #fff !important;
            padding: 0;
            margin-right: 15px;
            width: 100%;
        }
    }
</style>
