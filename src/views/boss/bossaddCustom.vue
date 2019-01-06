<template>
    <div class="bossAddCustom_container">
        <div>
            12
        </div>
    </div>
</template>

<script>
    import { Cell, CellGroup, Button, Field, Toast, Popup, Picker } from 'vant';
    import dayjs from 'dayjs';
    import { getEstate } from '@/server';

    export default {
        name: 'bossAddCustom',
        components: {
            Cell,
            CellGroup,
            Button,
            Field,
            Toast,
            Popup, 
            Picker
        },
        data() {
            return {

            };
        },
        created() {
            let time = dayjs().add(-7, 'day').format('YYYY-MM-DD');;
        },
        methods: {
            
        }
    }
</script>

<style lang="scss">
    .bossAddCustom_container {
        
    }
</style>
