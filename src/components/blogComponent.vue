<template>
    <div class="blog-component">
        <router-link :to="{name:'Blog', params:{id: blogProp.id}}">
            <div class="card text-dark">
                <img class="card-img-top" :src="blogProp.imgUrl" alt />
                <div class="card-body">
                    <h4 class="card-title">{{blogProp.title}}</h4>
                    <p>{{blogProp.creator.name}}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "blog-component",
        props: ["blogProp"],
    };
</script>