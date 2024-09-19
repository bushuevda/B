//Имена элементов холста
const NAME_CONNECT_POINT_TOP = 'connectPointTop';
const NAME_CONNECT_POINT_DOWN = 'connectPointDown';
const NAME_CONNECT_POINT_LEFT = 'connectPointLeft';
const NAME_CONNECT_POINT_RIGHT = 'connectPointRight';
const NAME_FIGURE_TEXT = 'figureText';


//Класс соединительные точки
class ConnectPoints{
    constructor(group, layer){
        //слой холста
        this._boardLayer = layer;

        //список соединительных точек
        this._listConnectPoints = Array();

        //координаты группы фигура
        var coordinateGroup = {x: group.attrs.x, y: group.attrs.y};

        //высота группы фигура
        var heightGroup = group.attrs.height;

        //ширина группы фигура
        var widthGroup = group.attrs.width;

        //Соединительная точка вверх
        this._pointTop = new Konva.Circle({
            y: coordinateGroup.y,
            x: coordinateGroup.x + widthGroup / 1.8,
            width: 20,
            height: 20,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 5,
            draggable: false,
            visible: false,
            name: NAME_CONNECT_POINT_TOP
        });

        //Соединительная точка низ
        this._pointDown = new Konva.Circle({
            y: coordinateGroup.y - heightGroup,
            x: coordinateGroup.x + widthGroup / 2,
            width: 20,
            height: 20,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 5,
            draggable: false,
            visible: false,
            name: NAME_CONNECT_POINT_DOWN
        });

        //Соединительная точка лево
        this._pointLeft = new Konva.Circle({
            y: coordinateGroup.y - heightGroup / 2,
            x: coordinateGroup.x,
            width: 20,
            height: 20,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 5,
            draggable: false,
            visible: false,
            name: NAME_CONNECT_POINT_LEFT
        });

        //Соединительная точка право
        this._pointRight = new Konva.Circle({
            y: coordinateGroup.y - heightGroup / 2,
            x: coordinateGroup.x + widthGroup,
            width: 20,
            height: 20,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 5,
            draggable: false,
            visible: false,
            name: NAME_CONNECT_POINT_RIGHT
        });


        //Формирование списка соединительных точек
        this._listConnectPoints.push(this._pointDown);
        this._listConnectPoints.push(this._pointTop);
        this._listConnectPoints.push(this._pointLeft);
        this._listConnectPoints.push(this._pointRight);
    }


    //Получение списка соединительных точек
    get listConnectPoints(){
        return this._listConnectPoints;
    }


        /* НА УДАЛЕНИЕ В ДАЛЬНЕЙШЕМ !!!
    onClickTop(){
        var layer = this._boardLayer;
        var xTop = this._pointTop.attrs.x;
        var yTop = this._pointTop.attrs.y;
        this._pointTop.on('click mouseenter', (e) =>{
            console.log('Click top');
            var arr = new Konva.Arrow({
                y: 55,
                x: 255,
                width: 10,
                height: 10,
                fill: 'yellow',
                stroke: 'black',
                strokeWidth: 5,
                draggable: false,
                visible: true
            });
            layer.add(arr);
            layer.draw();
        })
        this._pointTop.on('mousedown',(e)=>{
            console.log('mouse down');
        })
        this._pointTop.on('mousemove', (e)=>{
            console.log('mouse move');
        })
    }
    */

}

//Абстрактный класс шаблон фигуры
class FigureTemplate{
    constructor(layer){

        //слой холста
        this._boardLayer = layer;

        //фигура
        this._figure = '';

        //группа фигура
        this._group = new Konva.Group({x:150, y:150, width:50, height:25, draggable: true});

        //список соединительных точек
        this._listConnectPoints = new ConnectPoints(this._group, this._boardLayer).listConnectPoints;

        //элемент фигуры текст
        this._text = new Konva.Text({
            text: 'Simple Text sdsd ',
            fontSize:8,
            height:'auto',
            width:15,
            fontFamily: 'Calibri',
            fill: 'green', 
            name: NAME_FIGURE_TEXT
        });
        this._text.wrap('char');

        //элемент фигуры трансформер
        this._transformer = new Konva.Transformer({
            nodes: [],
            rotateAnchorOffset: 60,
            enabledAnchors: ['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center','bottom-right']
        });
    }


 onMove(figure, group, listConnectPoints, text){

        group.on('dragmove', (e) => {
            //Figure points
            //point down
            listConnectPoints[0].position({x: group.attrs.x, y:  group.attrs.y - group.attrs.height * 1.2 }); 
  
            //point top
            listConnectPoints[1].position({x: group.attrs.x, y:  group.attrs.y + group.attrs.height * 1.2 }); 


            //point left
            listConnectPoints[2].position({x: group.attrs.x - group.attrs.width * 1.2 , y:  group.attrs.y}); 

            //point right
            listConnectPoints[3].position({x: group.attrs.x + group.attrs.width * 1.2, y:  group.attrs.y}); 

            //Figure text
            text.position({x: group.attrs.x, y: group.attrs.y});
            text.offsetX(text.width() / 2);
            text.offsetY(text.height() / 2);
        })
        group.on('transform', (e) => {
            //Figure points
            //point down
            listConnectPoints[0].position({x: group.attrs.x, y:  group.attrs.y - group.attrs.height * 1.2 * group.scale().y}); 
  
            //point top
            listConnectPoints[1].position({x: group.attrs.x, y:  group.attrs.y + group.attrs.height * 1.2 * group.scale().y}); 


            //point left
            listConnectPoints[2].position({x: group.attrs.x - group.attrs.width * 1.2 * group.scale().x, y:  group.attrs.y}); 

            //point right
            listConnectPoints[3].position({x: group.attrs.x + group.attrs.width * 1.2 * group.scale().x, y:  group.attrs.y}); 
            console.log(group.scale().x + " ----- " + group.scale().y);


            text.position({x: group.attrs.x, y: group.attrs.y});

        })
    }

    //Геттеры получения аттрибутов 
    get figure(){
        return this._figure;
    }

    get text(){
        return this._text;
    }
    
    get group(){
        return this._group;
    }
    get transformer(){
        return this._transformer;
    }

    get listConnectPoints(){
        return this._listConnectPoints;
    }
}