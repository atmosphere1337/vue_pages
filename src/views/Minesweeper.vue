<script setup lang="ts">
    import {ref, computed, watch, getCurrentInstance} from 'vue';
    import Square from '../components/minesweeper/Square.vue' 
    import Table from '../components/minesweeper/Table.vue'
    const width = ref(10)
    const height = ref(10)
    const bombs = ref(10)
    const bombs_left = ref(bombs.value)
    const cells_towin_left = ref(width.value * height.value - bombs.value)
    const gameover = ref(false)
    function createArray(width:number, height:number): number[][]
    {
        let out: number[][] = new Array(height)
        for (let i = 0; i < height; i++)
            out[i] = new Array(width).fill(0)
        return out;
    }
    function createMap(width:number, height:number, times:number):number [][]
    {
        let size = width * height
        let linear_out: number[] = new Array(size).fill(0)
        let places: number[] = []
        let contender: number
        for (let i = 0; i < times; i++)
        {
            do
                contender = Math.floor(Math.random() * size)
            while (places.includes(contender))
            places.push(contender)
            linear_out[contender] = 1
        }
        let out: number[][] = createArray(width, height)
        for (let i = 0; i < height; i++) 
            for (let j = 0; j < width; j++)
                out[i][j] = linear_out[width * i + j]
        return out
    }
    function gridString(inp:number):string
    {
        let out:string = (100/inp).toString() + "%"
        return out.repeat(inp).trim() 
    }
    function check_neighbours(pos:number):number
    {
        let y:number = Math.floor(pos/width.value)
        let x:number = pos % height.value
        let out:number = 0
        out += (y + 1 >= height.value) ? 0 : map.value[y + 1][x]
        out += (y + 1 >= height.value || x + 1 >= width.value) ? 0 : map.value[y + 1][x + 1]
        out += (x + 1 >= width.value) ? 0 : map.value[y][x + 1]
        out += (y - 1 < 0 || x + 1 >= width.value) ? 0 : map.value[y - 1][x + 1]
        out += (y - 1 < 0) ? 0 : map.value[y - 1][x]
        out += (y - 1 < 0 || x - 1 < 0) ? 0 : map.value[y - 1][x - 1]
        out += (x - 1 < 0) ? 0 : map.value[y][x - 1]
        out += (y + 1 >= height.value || x - 1 < 0) ? 0 : map.value[y + 1][x - 1]
        return out
    }
    function scan_neighbours():number[][]
    {
        let out:number[][] = createArray(height.value, width.value)
        for (let i = 0; i < height.value; i++)
            for (let j = 0; j < width.value; j++)
            {
                if (map.value[i][j] == 1)
                    out[i][j] = 9
                else 
                    out[i][j] = check_neighbours(i * width.value + j)
            }
        return out
    }
    function extending(y:number, x:number)
    {
        if (map_visible.value[y][x] == 1 || map.value[y][x] == 1)
            return
        if (map_neighbour.value[y][x] > 0 && map_neighbour.value[y][x] < 9)
        {
            map_visible.value[y][x] = 1
            return
        }
        if (map_neighbour.value[y][x] == 0 && map_visible.value[y][x] == 0)
        {
            map_visible.value[y][x] = 1
            if (y < height.value - 1 && map_neighbour.value[y + 1][x] < 9)
                extending(y + 1, x)
            if (y > 0 && map_neighbour.value[y - 1][x] < 9)
                extending(y - 1, x)
            if (x < width.value - 1 && map_neighbour.value[y][x + 1] < 9)
                extending(y, x + 1)
            if (x > 0 && map_neighbour.value[y][x - 1] < 9)
                extending(y, x - 1)

            if (y < height.value - 1 && x < width.value - 1 &&  map_neighbour.value[y + 1][x + 1] < 9)
                extending(y + 1, x + 1)
            if (y > 0 && x > 0 && map_neighbour.value[y - 1][x - 1] < 9)
                extending(y - 1, x - 1)
            if (x < width.value - 1 && y > 0 && map_neighbour.value[y - 1][x + 1] < 9)
                extending(y - 1, x + 1)
            if (x > 0 && y < height.value - 1 && map_neighbour.value[y][x - 1] < 9)
                extending(y + 1, x - 1)
        }
        return 
    }
    function restart_function()
    {
        alert('restart')
    }
    function press_click(counter:number):boolean
    {
        let y:number = Math.floor(counter/width.value)
        let x:number = counter % height.value
        if (line_map.value[counter] == 1)
        {
            for (let i:number = 0; i < height.value; i++)
                for (let j:number = 0; j < width.value; j++)
                {
                    if (map.value[i][j] == 1)
                        map_visible.value[i][j] = 1
                }
            alert('you lost')
            gameover.value = true
            return false
        }
        if (line_map_neighbour.value[counter] == 0)
            extending(y, x)
        else if (line_map_neighbour.value[counter] > 0 && line_map_neighbour.value[counter] < 9)
            map_visible.value[y][x] = 1
        return true
    }
    const map = ref(createMap(height.value,width.value,bombs.value))
    const map_visible = ref(createArray(height.value, width.value))
    const map_neighbour = computed(()=>{return scan_neighbours()})
    const line_map = computed(()=>{return map.value.reduce((a:number[], b:number[])=>a.concat(b), [])})
    const line_map_visible = computed(()=>{return map_visible.value.reduce((a:number[], b:number[])=>a.concat(b), [])})
    const line_map_neighbour = computed(()=>{return map_neighbour.value.reduce((a:number[], b:number[])=>a.concat(b), [])}) 
    const bombs_left_change = (out:boolean)=> out ? bombs_left.value-- : bombs_left.value++
    watch(line_map_visible, (new_val)=>{
        let total_done:number = new_val.reduce((acc, val) => acc + val, 0)
        if (total_done == cells_towin_left.value)
        {
            alert('You won')
            gameover.value = true
        }
    })
</script>
<template>
    <div class="minesweeper">
        <div class="m_window">
            <div class="m_info">
                <Table
                 :bombs="bombs_left"
                 @restart="restart_function()"
                >
                </Table>
            </div>
            <div class="m_outerfield">
                <div class="m_field" :style="{gridTemplateColumns: gridString(10), gridTemplateRows: gridString(10)}" >
                    <Square
                     v-for="(x, i) in line_map_visible"
                     :vis="x"
                     :pos="i"
                     :mode="line_map[i]"
                     :click_handler="press_click"
                     :neighbours="line_map_neighbour[i]"
                     :gameover="gameover"
                     @marked_down="(out)=>bombs_left_change(out)"
                     >
                    </Square>
                </div>
            </div>
        </div>
    </div>
    <div v-for="x in map_visible">
        {{x}}
    </div>
</template>