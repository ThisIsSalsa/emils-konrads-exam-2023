<template>
    <Header v-if="is_authenticated"></Header>
    <div id="section-body">
        <Navigation v-if="is_authenticated"></Navigation>
        <router-view class="section-router"></router-view>
    </div>
    <div id="section-player" v-if="is_authenticated">
        <AudioPlayer />
    </div>

</template>


<script>
import { useAuthStore } from '@/stores/auth'
import Header from '@/components/HeaderComponent.vue';
import AudioPlayer from '@/components/AudioPlayerComponent.vue';
import NavigationComponent from '@/components/NavigationComponent.vue';

export default {
    components: {
        Header,
        AudioPlayer,
        NavigationComponent
    },
    computed: {
        is_authenticated() {
            return useAuthStore().authenticated;
        }
    }
}
</script>