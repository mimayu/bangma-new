<template>
    <div class="organization_container">
        <h3>管理层</h3>
        <Cell-group class="group">
            <Cell title="毛阿敏" value="(老板)" />
        </Cell-group>
        <h3>业务部</h3>
        <Cell-group class="group">
            <Cell title="姓名" value="董春华" />
        </Cell-group>
        <Cell-group class="group">
            <Cell title="性别" value="男" />
        </Cell-group>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { Cell, CellGroup, Toast } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'organization',
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
        created() {

        },
        methods: {
            
        }
    }
</script>

<style lang="scss">
    .organization_container {
        h3 {
            font-size: 14px;
            padding-left: 15px;
            line-height: 32px;
        }
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
