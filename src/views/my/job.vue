<template>
    <div class="my_container">
        <Cell-group class="group">
            <Cell title="部门" :value="user.departmentname || '-'" />
            <Cell title="角色" :value="user.rolename || '-'" />
            <Cell title="分组" :value="user.groupname || '-'" />
        </Cell-group>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Toast } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'job',
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
            
        }
    }
</script>

<style lang="scss">
    .my_container {
        .group {
            margin-bottom: 10px;
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
