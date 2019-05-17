<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
  import * as Three from 'three'

  export default {
    name: 'ThreeTest',
    data() {
      return {
        camera: null,
        scene: null,
        renderer: null,
        mesh: null
      }
    },
    methods: {
      init() {


        this.scene = new Three.Scene();     //先建立一个场景


        let container = document.getElementById('container');
        this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10);      //建立相机
        this.camera.position.z = 1;


        let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);

        let color
        geometry.faces.forEach((item, index) => {
          if (index % 2 === 0) {
            color = Math.random() * 0xffffff
          }
          item.color.setHex(color)

        })

        let material = new Three.MeshBasicMaterial({vertexColors: Three.FaceColors});
        this.mesh = new Three.Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.renderer = new Three.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);

      },
      animate() {
        requestAnimationFrame(this.animate);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
      }
    },
    mounted() {
      this.init();
      this.animate()
    }
  }
</script>
<style scoped>
  #container {
    height: 400px;
  }
</style>
