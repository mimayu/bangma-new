<template>
    <div class="assignList_container">
        <List
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="handleLoad"
        >
            <Cell-group class="group" v-for="item in assignLists" :key="item.iCustomerId">
                <Cell title="订单号" :value="item.iCustomerId" is-link />
                <Cell title="姓名" :value="item.sUsername" />
                <Cell title="手机号" :value="item.sMobile" />
                <Cell title="地址" :value="item.sAddress" />
                <Cell title="施工内容" :value="item.sRemarks" />
                <Cell title="业务员" :value="item.iSalesName" />
                <div class="van-cell btn_wrap" v-if="item.actions">
                    <button plain type="primary" class="assign_btn" v-for="(action, index) in item.actions" :key="action.type" @click="handleClick(action.type, item.iCustomerId)">{{action.name}}</button>
                </div>
            </Cell-group>
        </List>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Toast, List } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚
    import { getAssignedList } from '@/server';

    export default {
        name: 'assignList',
        components: {
            Cell,
            CellGroup,
            Toast,
            List,
            footerNav
        },
        data() {
            return {
                assignLists: [],
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
                        console.log('res', res);
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
        }
    }
</script>

<style lang="scss">
    .assignList_container {
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
    }
</style>
