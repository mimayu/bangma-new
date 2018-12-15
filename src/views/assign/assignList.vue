<template>
    <div class="allStaff_container">
        <Row class="header">
            <Col span="8">
                <Cell title="筛选" is-link arrow-direction="down" @click="choseType"/>
            </Col>
            <Col span="8">
                <Cell title="搜索" />
            </Col>
        </Row>
        <div>
            11
        </div>
        <Popup v-model="typeShow" position="bottom">
            <Picker show-toolbar :columns="typeLists" @cancel="handleTypeCancel" @confirm="handleTypeComfirm" @change="handleTypeSelect" />
        </Popup>
        <footerNav class="footer"></footerNav>
    </div>
</template>

<script>
    import { getAssignList } from '@/server';
    import { Cell, CellGroup, Popup, Row, Col, Picker, Toast } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
        name: 'allStaff',
        components: {
            Cell,
            CellGroup,
            Popup,
            Picker,
            Row,
            Col,
            Toast,
            footerNav: footerNav
        },
        data() {
            return {
                typeShow: false,
                typeLists: [ 
                    '业务部',
                    '工程部',
                    '内勤',
                    '人事',
                    '财务'
                ]
            };
        },
        created() {
            this.getAssignList()
        },
        methods: {
            choseType() {
                this.typeShow = true;
            },
            handleTypeComfirm() {
                this.typeShow = false;
            },
            handleTypeCancel() {
                this.typeShow = false;
            },
            handleTypeSelect() {

            },
            getAssignList() {
                let params = {
                    'page': 1
                }
                getAssignList(params).then(
                    res => {
                        console.log('res', res);
                    }
                )
            }
        }
    }
</script>

<style lang="scss">
    .allStaff_container {
       
    }
</style>
