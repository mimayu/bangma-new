<template>
    <dl class="structure">
       <dt>管理层</dt>
       <dd>周芷若<span>(掌门人)</span></dd>
       <dd>孙悟空<span>(齐天大圣)</span></dd>
       <dt>管理层</dt>
       <dd>周芷若<span>(掌门人)</span></dd>
       <dd>孙悟空<span>(齐天大圣)</span></dd>
       <dt>管理层</dt>
       <dd>周芷若<span>(掌门人)</span></dd>
       <dd>孙悟空<span>(齐天大圣)</span></dd>
       <dt>管理层</dt>
       <dd>周芷若<span>(掌门人)</span></dd>
       <dd>孙悟空<span>(齐天大圣)</span></dd>
    </dl>
</template>

<script>
    import { doLogout } from '@/server';
    import { Cell, CellGroup, Toast, Button } from 'vant';
    import footerNav from "../../components/footerNav"; // 引入页脚

    export default {
       
    }
</script>

<style lang="scss">
    .structure{
        dt,dd{padding:0 15px;border-bottom:1px solid #f2f2f2;}
        dt{background:#f9f9f9; color:gray;line-height:1.5;font-size:12px;}
        dd{line-height:2.5;font-siza:16px;
            span{color:gray;font-size:14px; padding-left:10px;}
        }
    }
</style>
