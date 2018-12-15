<template>
    <div class="my_container">
        <Cell-group class="group">
            <Cell title="姓名" value="董春华" />
            <Cell title="性别" value="男" />
            <Cell title="年龄" value="28岁" />
            <Cell title="手机号" value="15588997766" />
            <Cell title="住址" value="远景路97弄48号2103室" />
            <Cell title="故乡" value="江苏省南通市" />
            <Cell title="身份证" value="021356198709093521" />
            <Cell title="学历" value="本科" />
            <Cell title="专业" value="水电" />
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
        created() {

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
