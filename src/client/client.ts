import * as THREE from 'three'
import { BufferGeometry, Mesh } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { gsap } from 'gsap'

// /**
//  * Loaders
//  */
// const loadingBarElement = document.querySelector('.loading-bar')
// const loadingManager = new THREE.LoadingManager(
//     // Loaded
//     () =>
//     {
//         // Wait a little
//         window.setTimeout(() =>
//         {
//             // Animate overlay
//             gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

//             // Update loadingBarElement
//             loadingBarElement.classList.add('ended')
//             loadingBarElement.style.transform = ''
//         }, 500)
//     },

//     // Progress
//     (itemUrl, itemsLoaded, itemsTotal) =>
//     {
//         // Calculate the progress and update the loadingBarElement
//         const progressRatio = itemsLoaded / itemsTotal
//         loadingBarElement.style.transform = `scaleX(${progressRatio})`
//     }
// )


const scene = new THREE.Scene()

// const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
// const overlayMaterial = new THREE.ShaderMaterial({
//     // wireframe: true,
//     transparent: true,
//     uniforms:
//     {
//         uAlpha: { value: 1 }
//     },
//     vertexShader: `
//         void main()
//         {
//             gl_Position = vec4(position, 1.0);
//         }
//     `,
//     fragmentShader: `
//         uniform float uAlpha;

//         void main()
//         {
//             gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
//         }
//     `
// })


const light = new THREE.PointLight(0xf5c542)
light.position.set(1.5, 1.4, 1.0)
scene.add(light)

const light2 = new THREE.PointLight()
light2.position.set(-10.5, 1.4, 10.0)
scene.add(light2)

// const ambientLight = new THREE.AmbientLight(0x8fffee)
// scene.add(ambientLight)


// const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf)
// scene.add(gridHelper)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true,
// })

// const cube = new THREE.Mesh(geometry, material)
// cube.position.set(0, 0.5, -10)
// scene.add(cube)

let avatar = new THREE.Group()
let avatar2 = new THREE.Group()
let avatar3 = new THREE.Group()
let lamp = new THREE.Group()
let fer = new THREE.Group()
let vr = new THREE.Group()

const fbxLoader = new FBXLoader()


fbxLoader.load(
    'models/ver.fbx',
    (object6) => {
        vr = object6
         vr.scale.set(.1, .1, .1)

        vr.position.set(-30, 1, 0)
        scene.add(vr)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

fbxLoader.load(
    'models/fer.fbx',
    (object5) => {
        fer = object5
        fer.scale.set(.4, .4, .4)

        fer.position.set(-16, 0, -1)
        scene.add(fer)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

// fbxLoader.load(
//     'models/56088.fbx',
//     (object4) => {
//         lamp = object4
//         lamp.scale.set(.001, .001, .001)

//         lamp.position.set(-16, 0, -1)
//         scene.add(lamp)
//     },
//     (xhr) => {
//         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
//     },
//     (error) => {
//         console.log(error)
//     }
// )

fbxLoader.load(
    'models/noqkhoone.fbx',
    (object3) => {
        avatar3 = object3
        
        avatar3.position.set(-8, 1, -1)
        scene.add(avatar3)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
) 

fbxLoader.load(
    'models/noq3d4.fbx',
    (object2) => {
        avatar2 = object2
       
         avatar2.scale.set(.5, .5, .5)
        scene.add(avatar2)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

fbxLoader.load(
    'models/NoqSceneenv.fbx',
    (object) => {
        avatar = object
        
        scene.add(avatar)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

/* Liner Interpolation
 * lerp(min, max, ratio)
 * eg,
 * lerp(20, 60, .5)) = 40
 * lerp(-20, 60, .5)) = 20
 * lerp(20, 60, .75)) = 50
 * lerp(-20, -10, .1)) = -.19
 */
function lerp(x: number, y: number, a: number): number {
    return (1 - a) * x + a * y
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start: number, end: number) {
    return (scrollPercent - start) / (end - start)
}

const animationScripts: { start: number; end: number; func: () => void }[] = []

//add an animation that flashes the cube through 100 percent of scroll
// animationScripts.push({
//     start: 0,
//     end: 101,
//     func: () => {
//         let g = material.color.g
//         g -= 0.05
//         if (g <= 0) {
//             g = 1.0
//         }
//         material.color.g = g
//     },
// })

//add an animation that moves the cube through first 40 percent of scroll
animationScripts.push({
    start: 0,
    end: 20,
    func: () => {
        camera.lookAt(avatar2.position)
        camera.position.set(0, 1, 2)
        // cube.position.z = lerp(-10, 0, scalePercent(0, 20))
        avatar2.position.z = lerp(-10, -1, scalePercent(0, 20))
        

        //console.log(cube.position.z)
    },
})

//add an animation that moves the cube through first 40 percent of scroll
animationScripts.push({
    start: 20,
    end: 30,
    func: () => {
        camera.position.x = lerp(0, -8, scalePercent(20, 30))
        // camera.lookAt(avatar3.position)


        //console.log(cube.position.z)
    },
})

animationScripts.push({
    start: 30,
    end: 40,
    func: () => {
        // camera.lookAt(avatar3.position)
        avatar3.rotation.z = lerp(0, Math.PI, scalePercent(30, 40))


        //console.log(cube.position.z)
    },
})

//add an animation that moves the cube through first 40 percent of scroll
animationScripts.push({
    start: 40,
    end: 50,
    func: () => {
        camera.position.x = lerp(-8, -16, scalePercent(40, 50))
        // camera.lookAt(avatar3.position)


        //console.log(cube.position.z)
    },
})

animationScripts.push({
    start: 50,
    end: 60,
    func: () => {
        // camera.lookAt(avatar3.position)
        fer.rotation.y = lerp(0, Math.PI, scalePercent(50, 60))


        //console.log(cube.position.z)
    },
})

//add an animation that moves the cube through first 40 percent of scroll
animationScripts.push({
    start: 60,
    end: 70,
    func: () => {
        camera.position.x = lerp(-16, -30, scalePercent( 60, 70))
        // camera.lookAt(avatar3.position)
        // camera.rotation.x = lerp(0, 2, scalePercent(60, 70))


        //console.log(cube.position.z)
    },
})

animationScripts.push({
    start: 70,
    end: 80,
    func: () => {
        // camera.lookAt(vr.position)
        vr.rotation.y = lerp(0, Math.PI, scalePercent(70, 80))


        //console.log(cube.position.z)
    },
})


animationScripts.push({
    start: 80,
    end: 90,
    func: () => {
        // camera.lookAt(vr.position)
        camera.rotation.x = lerp(0, 2, scalePercent(80, 90))


        //console.log(cube.position.z)
    },
})


animationScripts.push({
    start: 90,
    end: 101,
    func: () => {
        // camera.lookAt(vr.position)
        // camera.rotation.x = lerp(0, 2, scalePercent(80, 90))
        camera.position.y = lerp( 1, 80, scalePercent( 90, 101))


        //console.log(cube.position.z)
    },
})

//add an animation that auto rotates the cube from 80 percent of scroll
// animationScripts.push({
//     start: 80,
//     end: 101,
//     func: () => {
//         //auto rotate
//         cube.rotation.x += 0.01
//         cube.rotation.y += 0.01
//     },
// })

function playScrollAnimations() {
    animationScripts.forEach((a) => {
        if (scrollPercent >= a.start && scrollPercent < a.end) {
            a.func()
        }
    })
}

let scrollPercent = 0

document.body.onscroll = () => {
    //calculate the current scroll progress as a percentage
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100
    ;(document.getElementById('scrollProgress') as HTMLDivElement).innerText =
        'Scroll Progress : ' + scrollPercent.toFixed(2)
}

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    playScrollAnimations()

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

window.scrollTo({ top: 0, behavior: 'smooth' })
animate()