<template>
    <div class="setting_container">
        <Cell-group class="group">
            <Cell title="用户名" value="13774387155" />
            <Cell title="密码" value="修改密码" is-link/>
        </Cell-group>
        <Button size="large" @click="handleQuit">退出登录</Button>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { doLogout } from '@/server';
    import { Cell, CellGroup, Toast, Button } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'setting',
        components: {
            Cell,
            CellGroup,
            Toast,
            Button,
            footerNav: footerNav
        },
        data() {
            return {
                
            };
        },
        methods: {
            handleQuit() {
                doLogout().then(
                    res => {
                        console.log('res', res);
                        if(res.success == 1) {
                            Toast('退出成功')
                        }else {
                            Toast('退出失败')
                        }
                    }
                )
            }
        }
    }
</script>

<style lang="scss">
    .setting_container {
        .group {
            margin-bottom: 10px;
            .van-cell {
                background: rgba(242, 242, 242, 1);
            }
        }
    }
</style>
