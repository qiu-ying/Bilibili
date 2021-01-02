<template>
  <div>
      <div class="logTop">
          <div></div>
          <div>{{midleTop}}</div>
          <div>
              <slot name="right"/>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: ['midleTop']
}
</script>

<style  lang = 'less'>
 .logTop {
     height: 12.5vw;
     background-color: white;
     display: flex;
     div {
         flex: 1;
         display: flex;
         justify-content: center;
         align-items: center;
         font-size: 4.444vw;
     }
 }

</style>