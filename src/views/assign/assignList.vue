<template>
    <div class="assignList_container">
        <Row class="header">
            <Col span="6">
                <Cell title="筛选" is-link arrow-direction="down" @click="choseStatus"/>
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
                <Cell title="姓名" :value="item.sUsername" />
                <Cell title="手机号" :value="item.sMobile" />
                <Cell title="固话" :value="item.sTelphone" />
                <Cell title="区域" :value="item.region_name" />
                <Cell title="地址" :value="item.sAddress" />
                <Cell title="施工内容" :value="item.sRemarks" />
                <Cell title="业务员" :value="item.iSalesName" />
                <Cell title="建单日期" :value="item.tOrderDate" />
                <div class="van-cell btn_wrap" v-if="item.actions">
                    <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
                </div>
            </Cell-group>
        </List>
        </div>
        <Popup v-model="statusShow" position="bottom">
            <Picker show-toolbar :columns="statusLists" @cancel="handleStatusCancel" @confirm="handleStatusComfirm" />
        </Popup>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Popup, Row, Col, Picker, Toast, Search, List } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚
    import { getAssignedList } from '@/server';

    export default {
        name: 'assignList',
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
                statusShow: false,
                statusLists: [ 
                    '全部状态',
                    '基检未约',
                    '基检确认',
                    '基检再约',
                    '基检取消',
                    '签约等待',
                    '签约成功',
                    '派工完成',
                    '开工进场',
                    '完工验收',
                    '完工付款',
                    '审核完成',
                    '已结算',
                    '签约失败',
                    '合同取消'
                ],
                statusCode: [
                    '', '1', '2', '103', '3', '4', '5', '6', '7', '8', '9', '10', '11', '101', '102'
                ],
                status: '', // 删选类型
                page: 1,
                value:'',
                loading: false,
                finished: false
            };
        },
        methods: {
            /*
            * 滑动加载
            */
            handleLoad() {
                this.getAssignedList();
            },
            /*
            * 加载数据
            */
            getAssignedList() {
                let params = {
                    'page': this.page
                }
                getAssignedList(params).then(
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
                        window.location.href = 'http://www.51bangma.com/client/edit/?iCustomerId='+id+'&backurl=http://m.51bangma.com/assignList/';
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
                    'status':this.status,
                    'keyword': this.value,
                }
                getAssignedList(params).then(
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
            choseStatus() {
                this.statusShow = true;
            },
            handleStatusComfirm(value) {
                let index = this.statusLists.findIndex((item) => {
                    return item == value
                });
                let status = this.statusCode[index];
                this.status = status;
                this.statusShow = false;
            },
            handleStatusCancel() {
                this.statusShow = false;
            },

        }
    }
</script>

<style lang="scss">
    .assignList_container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 53px;
        right: 0;
        display: flex;
        flex-direction: column;
        background-color: #f6f6f6;
        .content {
            flex: 1;
            overflow: auto;
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
