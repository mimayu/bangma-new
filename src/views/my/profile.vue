<template>
    <div class="profile_container">
        <Cell-group class="group">
            <Cell title="董春华" label="男" is-link @click="goMy"/>
        </Cell-group>
        <Cell-group class="group">
            <Cell title="工作信息" is-link @click="goJob"/>
        </Cell-group>
        <Cell-group class="group">
            <Cell title="组织架构" is-link @click="goOrganization"/>
        </Cell-group>
        <Cell-group class="group">
            <Cell title="设置" is-link @click="goSetting"/>
        </Cell-group>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { getProfile } from '@/server';
    import { Cell, CellGroup, Toast } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'profile',
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
            this.getProfile()
        },
        methods: {
            getProfile() {
                getProfile().then(
                    res => {
                        console.log('res', res);
                    }
                )
            },
            goMy() {
                this.$router.push('/my');
            },
            goJob() {
                this.$router.push('/my');
            },
            goOrganization() {
                this.$router.push('/organization');
            },
            goSetting() {
                this.$router.push('/setting');
            }
        }
    }
</script>

<style lang="scss">
    .profile_container {
       .group {
           margin-bottom: 10px;
           .van-cell {
                background: rgba(242, 242, 242, 1);
           }
       }
    }
</style>
