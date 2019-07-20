<template>
    <div class="underAssignList_container">
        <Row class="header">
            <Col span="6">
                <Cell title="筛选" is-link arrow-direction="down" @click="choseSource"/>
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
            <Cell-group class="group" v-for="item in assignLists" :key="item.iCustomerId">
                <Cell title="订单号" :value="item.iCustomerId" is-link />
                <Cell title="来源" :value="item.iSource_name" />
                <Cell title="配合人" :value="item.coordinator_name" v-if="item.coordinator_name!=null&&item.coordinator_name!=''"/>
                <Cell title="推荐人" :value="item.introducer_name"  v-if="item.introducer_name!=null&&item.introducer_name!=''"/>
                <Cell title="姓名" :value="item.sUsername" />
                <Cell title="手机号" :value="item.sMobile" />
                <Cell title="固话" :value="item.sTelPhone" />
                <Cell title="区域" :value="item.region_name" />
                <Cell title="地址" :value="item.sAddress" />
                <Cell title="施工内容" :value="item.sRemarks" />
                <Cell title="业务员" value="-" />
                <Cell title="建单日期" :value="item.tOrderDate" />
                <div class="van-cell btn_wrap" v-if="item.actions">
                    <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
                </div>
            </Cell-group>
        </List>
        </div>
        <Popup v-model="sourceShow" position="bottom">
            <Picker show-toolbar :columns="sourceLists" @cancel="handleSourceCancel" @confirm="handleSourceComfirm" />
        </Popup>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, Row, Col, Picker, Toast, Search, List } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚
    import { getAssignList } from '@/server';

    export default {
        name: 'underAssignList',
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
                assignLists: [],
                sourceShow: false,
                sourceLists: [ 
                    '全部状态',
                    '刷新转单',
                    '刷新PSR推荐',
                    '刷新工长推荐',
                    'icolor转单',
                    '尚品转单',
                    '家居顾问老客户',
                    '施工管家老客户',
                    '优居客转单',
                    '百度来源',
                    '刷新门店',
                    '天猫',
                    '老板电器',
                    '索菲亚',
                    '其它'
                ],
                sourceCode: [
                    '', 
                    '11', 
                    '12', 
                    '13', 
                    '14', 
                    '15', 
                    '16', 
                    '17', 
                    '18', 
                    '19', 
                    '20', 
                    '21', 
                    '22',
                    '23',
                    '101'
                ],
                value: '', // 搜索内容
                source: '', // 删选类型
                page: 1,
                loading: false,
                finished: false
            };
        },
        methods: {
            /*
            * 滑动加载
            */
            handleLoad() {
                this.getAssignList();
            },
            /*
            * 加载数据
            */
            getAssignList() {
                let params = {
                    'page': this.page
                }
                getAssignList(params).then(
                    res => {
                        if(res.success == 1) {
                            this.assignLists = this.assignLists.concat(res.list);
                            this.loading = false;
                            this.page += 1;
                            if(res.list.length == 0) {
                                this.finished = true;
                            }
                        }
                        //console.log('res', res);
                    }
                )
            },
            /*
            * 点击操作
            * 1 -> 派单
            * 10 -> 编辑
            */
            handleClick(type, id) {
                switch(type) {
                    case 0:
                        this.handleGo(id, type);
                        break;
                    case 1:
                        this.handleGo(id, type);
                        break;
                        case 10:
                        window.location.href = 'http://www.51bangma.com/client/edit/?iCustomerId='+id+'&backurl=http://m.51bangma.com/underAssignList/';
                        break; 
                    default:
                        break;
                }
            },
            /*
            * 处理预约/上门
            */
            handleGo(id, type) {
                let name = '';
                if(type == 0) {
                    name = 'previewCustom' 
                }
                if(type == 1) {
                    name = 'assign' 
                }
                this.$router.push(
                    {
                        name: name,
                        params: {
                            id: id
                        }
                    }
                )
            },
            /*
            * 处理搜索
            */
            handleSearch() {

                let params = {
                    'page': 1,
                    'source':this.source,
                    'keyword': this.value,
                }
                getAssignList(params).then(
                    res => {
                        if(res.success == 1) {
                            this.assignLists = res.list;
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
            choseSource() {
                this.sourceShow = true;
            },
            handleSourceComfirm(value) {
                let index = this.sourceLists.findIndex((item) => {
                    return item == value
                });
                let source = this.sourceCode[index];
                this.source = source;
                this.sourceShow = false;
            },
            handleSourceCancel() {
                this.sourceShow = false;
            },

        }
    }
</script>

<style lang="scss">
    .underAssignList_container {
        background-color: #f6f6f6;
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title, .van-cell__value{
            text-align: left;
        }
        .btn_wrap {
            justify-content: flex-end;
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
