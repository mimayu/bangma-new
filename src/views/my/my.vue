<template>
    <div class="my_container">
        <Cell-group class="group">
            <Cell title="姓名" :value="user.sName" />
        </Cell-group>
        <Cell-group class="group">
            <Cell title="性别" :value="changeGender(user.sSex)" />
        </Cell-group>
        <Cell-group class="group">
            <Cell title="年龄" :value="user.iAge || '-'" />
        </Cell-group>
        <Cell-group class="group">
            <Cell title="手机号" :value="user.sMobilePhone" />
        </Cell-group>
        <Cell-group class="group">
            <Cell title="住址" :value="user.sAddress" />
        </Cell-group>
        <Cell-group class="group">
            <Cell title="故乡" :value="user.sHometownName || '-'" />
        </Cell-group>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Toast } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'my',
        components: {
            Cell,
            CellGroup,
            Toast,
            footerNav: footerNav
        },
        data() {
            return {
                
            };
        },
        computed:{
            user: function() {
                return this.$store.getters.getUser;
            }
        },
        methods: {
           changeGender(gener) {
               if(gener == 'M'){
                    return '男';
                }else if(gener == 'F'){
                    return '女';
                }else{
                    return '';
                }
            }, 
        }
    }
</script>

<style lang="scss">
    .my_container {
        .group {
            .van-cell {
                background: rgba(242, 242, 242, 1);
            }
        }
        .van-cell__title, .van-field .van-cell__title {
            max-width: 100px;
        }
        .van-cell__title, .van-cell__value{
            text-align: left;
        }
    }
</style>
