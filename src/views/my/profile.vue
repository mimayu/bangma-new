<template>
    <div class="profile_container">
        <Cell-group class="group">
            <Cell :title="account.sName" :label="changeGender(account.sSex)" is-link @click="goMy"/>
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
                account: {
                    sName: '',
                    sSex: 'M'
                }
            };
        },
        created() {
            this.getProfile()
        },
        methods: {
            changeGender(gener) {
                return gener == 'M' ? '男' : '女';
            },
            getProfile() {
                getProfile().then(
                    res => {
                        if(res.success == 1) {
                            this.account = res.account;
                            console.log(121, this.$store)
                            this.$store.dispatch("setUser", res.account);
                        }else {
                            Toast(res.msg)
                        }
                    }
                )
            },
            goMy() {
                this.$router.push('/my');
            },
            goJob() {
                this.$router.push('/job');
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
