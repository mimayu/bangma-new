<template>
    <div class="organization_container">
        <section v-for="items in departments" :key="items.iId">
            <h3>{{items.sName}}</h3>
            <Cell-group class="group" v-for="item in items.accounts" :key="item.iId">
                <Cell :title="item.sName" :value="item.role_name" />
            </Cell-group>
        </section>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { getOrganization } from '@/server';
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
                departments: []
            };
        },
        created() {
            this.getOrganization();
        },
        methods: {
            getOrganization() {
                getOrganization().then(
                    res => {
                        this.departments = res.departments;
                    }
                )
            }
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
