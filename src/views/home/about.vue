<template>
  <div class="about">
    <img src="../../assets/img/about.jpg" alt="" />

    <h1>关于我</h1>
    <a-divider>about me</a-divider>
    <div class="about-list flex">
      <div class="part1">
        <a-divider orientation="left">爱好</a-divider>
        <ol>
          <li>
            阅读 &nbsp;&nbsp;种类广泛&nbsp;&nbsp; 精神食粮&nbsp;&nbsp;每天必读2h
          </li>
          <li>
            听歌 &nbsp;&nbsp;人送外号"中华小曲库" &nbsp;&nbsp;
            大多数歌曲都会嚎几句
          </li>
          <li>
            绘画&nbsp;&nbsp; 通过ipad上的绘图app画些简单的图&nbsp;&nbsp;
            最爱画《小王子》、《大鱼海棠》
          </li>
        </ol>
      </div>
      <div class="part2">
        <a-divider orientation="left">本网站</a-divider>
        <ol>
          <li>前端: vue3 + vite + ant design vue</li>
          <li>后端： nodejs + nestjs + typeorm + mysql</li>
          <li>运维：自动化部署插件（朋友贡献）+ 腾讯云 + nginx</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.about {
  padding-bottom: 80px;
  img {
    display: block;
    margin: auto;
    width: 100%;
  }
  h1 {
    display: block;
    text-align: center;
    margin: 32px auto -24px;
  }
  .about-list {
    max-width: 1400px;
    margin: auto;
    justify-content: space-between;
    & > div {
      width: 49%;
      background: #fff;
      padding: 24px;
      ol,
      li {
        list-style-type: disclosure-closed;
      }
      ol {
        padding-left: 18px;
      }
      li {
        border-bottom: 1px dashed #f2f2f2;
        padding: 12px 12px;
        &:hover {
          padding: 12px 4px;
          cursor: pointer;
          box-shadow: 0px 0px 5px #f2f2f2;
        }
      }
    }
  }
}
</style>