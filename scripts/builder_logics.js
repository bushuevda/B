//names
const RECTANGLE_NAME = 'Rectangle';
const CIRCLE_NAME = 'Circle';
const ROMB_T = 2;
const CONNECT_LINE_NAME = "ConnectLine";



class FigureRect{
    constructor(){
        this._group = new Konva.Group();
        this._text = new Konva.Text({
            x: 10,
            y: 15,
            text: 'Simple Text',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'green'
        });
        this._rect = new Konva.Rect({
            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 5
        });
        this._text.ptrFigure = this;
        this._rect.ptrFigure = this;
        this._group.add(this._rect, this._text);
        this._transformer = new Konva.Transformer({
            nodes: [],
            rotateAnchorOffset: 60,
            enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
        });


        //events
        //this.onClick();
    }

    onClick(){
        var rect = this._rect;
        var text = this._text;
        var transformer = this._transformer;
        rect.on('click', (e) => {
            console.log(e.target);
            transformer.nodes([rect, text]);
            console.log('clocl');
        })
    }


    get group(){
        return this._group;
    }
    get transformer(){
        return this._transformer;
    }

    set rect(value){
        this._rect = value;
    }
}



class FigureCircle{
    constructor(){
        this._group = new Konva.Group();
        this._text = new Konva.Text({
            x: 10,
            y: 15,
            text: 'Simple Text',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'green'
        });
        this._rect = new Konva.Circle({
            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 5
        });
        this._text.ptrFigure = this;
        this._rect.ptrFigure = this;
        this._group.add(this._rect, this._text);
        this._transformer = new Konva.Transformer({
            nodes: [],
            rotateAnchorOffset: 60,
            enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
        });


        //events
        //this.onClick();
    }

    onClick(){
        var rect = this._rect;
        var text = this._text;
        var transformer = this._transformer;
        rect.on('click', (e) => {
            console.log(e.target);
            transformer.nodes([rect, text]);
            console.log('clocl');
        })
    }


    get group(){
        return this._group;
    }
    get transformer(){
        return this._transformer;
    }
}


class Rectangle extends FigureTemplate{
    constructor(layer){
        super(layer);
        this._figure = new Konva.Rect({

            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 0,
            offsetX: 50,
            offsetY: 25,
            name: RECTANGLE_NAME
        });
        this._group.add(this._figure);
        this._text.ptrFigure = this;
        this._figure.ptrFigure = this;

        
        this.onMove(this._figure, this._group, this._listConnectPoints, this._text);
    }

}

class Circle extends FigureTemplate{
    constructor(layer){
        super(layer);
        this._figure = new Konva.Circle({

            width: 100,
            height: 50,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 0,
            name: CIRCLE_NAME
        });
        this._group.add(this._figure);
        this._text.ptrFigure = this;
        this._figure.ptrFigure = this;

        this.onMove(this._figure, this._group, this._listConnectPoints, this._text);
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
            listConnectPoints[0].position({x: group.attrs.x, y:  group.attrs.y - group.attrs.height }); 
  
            //point top
            listConnectPoints[1].position({x: group.attrs.x, y:  group.attrs.y + group.attrs.height * 1.2 * group.scale().y}); 


            //point left
            listConnectPoints[2].position({x: group.attrs.x - group.attrs.width * 1.2 * group.scale().x, y:  group.attrs.y}); 

            //point right
            listConnectPoints[3].position({x: group.attrs.x + group.attrs.width * 1.2 * group.scale().x, y:  group.attrs.y}); 



            text.position({x: group.attrs.x, y: group.attrs.y});

        })
    }
}

class Figure{
    _typeF;
    _shape;
    constructor(typeFigure, layer){
        switch (typeFigure) {
            case RECTANGLE_NAME:
                console.log('RECTANGLE');
                this._typeF = RECTANGLE_NAME;
                this._shape = new Rectangle(layer);
                break;
            case CIRCLE_NAME:
                console.log('CIRCLE');
                this._typeF = CIRCLE_NAME;
                this._shape = new Circle(layer);
                break;
            default:
                console.log('DEFAULT');
                this._typeF = RECTANGLE_NAME;
                break;
        }
    }
    get shape() {
        return this._shape;
    }
}








class Board{
    constructor(divId){
        //холст
        this._stage = new Konva.Stage({
            container: divId,   // id of container <div>
            width: window.innerWidth,
            height: window.innerHeight
        });
        //список элементов
        this._elements = Array();
        //слой холства
        this._layer = new Konva.Layer();

        //Вызов функции для прослушивания нажатия кнопки на холсте
        this.lisentOnClickStage();
        //Вызов функции прослушивания соединияющей стрелы
        this.listenArrow();
        //Вызов функции прослушивания скроллинга на холсте(stage)
        this.listenOnWheelStage();
    }

    //Функция прослушивания скроллинга на холсте(stage)
    listenOnWheelStage(){
        var stage = this._stage;
        var scaleBy = 1.1;

        this._stage.on('wheel', function (e){
            e.evt.preventDefault();
            var oldScale = stage.scaleX();
            var pointer = stage.getPointerPosition();

            var mousePointTo = {
                x: (pointer.x - stage.x()) / oldScale,
                y: (pointer.y - stage.y()) / oldScale,
            };
            
            let direction = e.evt.deltaY < 0 ? 1 : -1;

            var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

            stage.scale({ x: newScale, y: newScale });

            var newPos = {
                x: pointer.x - mousePointTo.x * newScale,
                y: pointer.y - mousePointTo.y * newScale,
            };
            stage.position(newPos);
        })
    }
    
    //функция прослушивания соединения двух фигур с помощью стрелы
    listenArrow(){
        //слой холста
        var layer = this._layer;
        //холст
        var stage = this._stage;
        //список соединительных точек
        var listConnectPoints = null;

        var lastTarget = null;
        //соединительная стрелка
        var arrow  = new Konva.Arrow({
            points: [0, 0, 0, 0],
            pointerLength: 4,
            pointerWidth: 4,
            stroke: 'black',
            strokeWidth: 2,
            opacity: 0.6, 
            name: CONNECT_LINE_NAME
          });

        //состояние нажатия мыши (false - не нажато)
        var entMouse = false;
        //состояние готовности соединения (false - отсутствие готовности)
        var connectPrepare = false;
        //событие нажатия мыши на соединительную точку
        stage.on('mousedown', (e) => {
            //если e.target.name одна из соединительных точек
            if(e.target.name() == NAME_CONNECT_POINT_TOP || e.target.name() == NAME_CONNECT_POINT_DOWN
                || e.target.name() == NAME_CONNECT_POINT_LEFT || e.target.name() == NAME_CONNECT_POINT_RIGHT){
                    console.log('stage mouse dows');
                    var pos = arrow.getRelativePointerPosition();

                    console.log("X:  " + e.target.x() + " ---e.target.x()---" + "Y:   " + e.target.y());
                    console.log("X:  " + e.target.getAbsolutePosition(layer).x + " ---absolutePosition.x---" + "Y:   " + e.target.getAbsolutePosition(layer).y);
                    console.log(e.target.name());
                    console.log(e.target.attrs.x + "    " + e.target.attrs.y);
                    var p = arrow.points();
                    p[0] = e.target.x() ;
                    p[1] = e.target.y();

                    arrow.points(p);
                    layer.add(arrow);

                    layer.draw();
                    entMouse = true;
            }
            else{
  
             
            }

         })

        //событие нажатия мыши на соединительную точку
        stage.on('mousemove', (e) => {
            if(entMouse){
                var pos = arrow.getRelativePointerPosition();
                var posStage = stage.getRelativePointerPosition();
                //console.log(e.target);
                if(pos)
                    var sh = layer.getIntersection({x: posStage.x, y: posStage.y});;
                if(sh && sh !== arrow && sh !== stage){
                    //console.log(sh);
                    console.log(sh.name());
                    if (sh.name() != NAME_CONNECT_POINT_TOP && sh.name() != NAME_CONNECT_POINT_DOWN
                    && sh.name() != NAME_CONNECT_POINT_LEFT && sh.name() != NAME_CONNECT_POINT_RIGHT 
                    && sh.name() != CONNECT_LINE_NAME){
                        listConnectPoints = sh.ptrFigure.listConnectPoints;
                        //console.log(listConnectPoints);
                        connectPrepare = false;   
                        for(let i = 0; i < listConnectPoints.length; i++){
        
                            listConnectPoints[i].show();
                        }
                    }
                    else{
                        connectPrepare = true;
                        lastTarget = e.target;
                    }

                }
    
                if(sh == stage && listConnectPoints != null){
                    for(let i = 0; i < listConnectPoints.length; i++){
                        connectPrepare = true;
                        listConnectPoints[i].hide();
                    }
                }
                    
                //console.log(arrow.points());
                if(entMouse)
                {
                    var p = arrow.points();
                    
                    p[2] = pos.x;
                    p[3] = pos.y;
                    arrow.points(p);
                    layer.draw();
                }
            }
            
        })

        //события отжатия кнопки мыши
        stage.on('mouseup', (e) => {
            if(entMouse){
                entMouse = false;
                console.log('stage mouse up');

                
                if(listConnectPoints != null)
                for(let i = 0; i < listConnectPoints.length; i++){
                    listConnectPoints[i].hide();
                }

                if(connectPrepare){
                    console.log(lastTarget);
                    console.log("CONNE");
                    var p = arrow.points();
                    p[2] = lastTarget.x();
                    p[3] = lastTarget.y();
                    arrow.points(p);
                    layer.add(arrow);
                    arrow = new Konva.Arrow({
                        points: [0, 0, 0, 0],
                        pointerLength: 4,
                        pointerWidth: 4,
                        stroke: 'black',
                        strokeWidth: 2,
                        opacity: 0.6,
                        name: CONNECT_LINE_NAME
                      });
                    layer.draw();
                }
                else{
                    connectPrepare = false;
                    arrow.remove();
                }
                
            }
            
         })
    }


    //функция прослушивания клика элемента холста
    lisentOnClickStage(){
        var stage = this._stage;
        var lastTargetPtr = null;
        var lastTarget = null;
        var lastListConnectPoints = null;

        stage.on('click', (e) =>{
            var listConnectPoints = null;
            if (e.target != stage)
            {
                


                //для фигур прямоугольник, круг и других -> функция скрытия выделения(трасформера) и соединительных точек
                //проверяется всегда вначале события
                if (lastTargetPtr){
                    //если фигура прямогуольник, круг или другой
                    if(lastTarget.name() == RECTANGLE_NAME || lastTarget.name() == CIRCLE_NAME){
                        lastTargetPtr.transformer.nodes([]);
                        if(lastListConnectPoints){
                            for(let i = 0; i < lastListConnectPoints.length; i++)
                            {
                                lastListConnectPoints[i].hide();
                            }
                        }
                    }
                }
                //конец
                //присвоение ссылки на фигуру
                lastTargetPtr = e.target.ptrFigure;
                //присовение фиугры
                lastTarget = e.target;


                //для фигур прямоугольник, круг и других -> функция выделения фигуры(показ трансформера) и показ соединительных точек
                if(lastTarget.name() == RECTANGLE_NAME || lastTarget.name() == CIRCLE_NAME){
                    lastListConnectPoints = lastTargetPtr.listConnectPoints;
                    lastTargetPtr.transformer.nodes([lastTargetPtr.group]);
                    for(let i = 0; i < lastListConnectPoints.length; i++)
                    {
                        lastListConnectPoints[i].show();
                    }
                }
                //конец
                
            }
            else {
                if(typeof lastTargetPtr !== 'undefined'){

                }

                
            }
        })
    }

    //функция добавления элемента в список для последующей отрисовки
    addElement(element){
        this._elements.push(element);
    }

    //функция отрисовки списка элементов
    drawElements(){
        for(let i = 0; i < this._elements.length; i++)
        {
            this._layer.add(this._elements[i]);
        }
        this._stage.add(this._layer);
        this._layer.draw();
    }

    //получение слоя 
    get layer(){
        return this._layer;
    }
}






class Builder{
    constructor(){
        var board = new Board('cont');
        var f = new Figure(RECTANGLE_NAME, board.layer);
        var f2 = new Figure(CIRCLE_NAME, board.layer);
    
        board.addElement(f.shape.group);
        board.addElement(f.shape.transformer);
        board.addElement(f.shape.text);
        var l = f.shape.listConnectPoints
        for (let i = 0; i < l.length; i++)
            board.addElement(l[i]);

        board.addElement(f2.shape.group);
        board.addElement(f2.shape.transformer);
        board.addElement(f2.shape.text);
        var l2 = f2.shape.listConnectPoints
        for (let i = 0; i < l2.length; i++)
            board.addElement(l2[i]);
        document.getElementById("creator_rectangle").addEventListener('click', (e) =>{
            var fg = new Figure(RECTANGLE_NAME, board.layer);
            board.addElement(fg.shape.group);
            board.addElement(fg.shape.transformer);
            board.addElement(fg.shape.text);
            var l = fg.shape.listConnectPoints
            for (let i = 0; i < l.length; i++)
                board.addElement(l[i]);
            board.drawElements();
        });
    
        board.drawElements();
    }
}



//var bl = new Builder();

  