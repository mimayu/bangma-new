<template>
    <div class="Uploader">
        <Uploader :after-read="handleRead">
            <Icon name="photograph" />
        </Uploader>
    </div>
</div>

</template>

<script>
import { Uploader, Icon } from 'vant';

export default {
    name: 'testCamer',
    components: {
        Uploader,
        Icon
    },
    data () {
        return {
        
        }
    },
    methods: {
        handleRead(file) {
            console.log('file', file);
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
</style>
