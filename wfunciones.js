//=======================================================================
//	wfunciones.js
//	funciones w
//=======================================================================

//-----------------------------------------
function wAddCuadrom2Layer(id)		//	crea el bloque cuadromino y lo agrega al layer
{
	if (DEBUG)
	{
		console.log('linea 3151,                id: ' + id );
		console.log('linea 3152,     wCuadromGroup: ' + wCuadromGroup );
		console.log('linea 3153, wCuadromGroup[id].x: ' + wCuadromGroup.x );
		console.log('linea 3153, wCuadromGroup[id].y: ' + wCuadromGroup[id].y );
	}
	//	wCreateCuadrado(wCuadromGroup[id]);
	wCreateCuadrado(wCuadromGroup);

	for(var g = 0; g < wPolyCuadrom.length; g++) {
		//	gBoardLayer.add(gPolyGroup[g].poly);
		gBoardLayer.add(wCuadromGroup[0].poly);
	}
}

//----------------------------------------
// create polygon group from block group
//----------------------------------------
function wCreateCuadrado(blockGroup, fixedBlock)	
{
	var i, polyId=0;
	var firstStyle;
	var poly, centerPos, leftUpPos;
	var pos;
	var poly;


	//	gBlockCellUsed += blockGroup[id].blockStyle[0].length;
	//	gBlockUsed++;
 	if (DEBUG)
	{
		console.log('linea 3181, blockGroup    : ' + blockGroup);
		console.log('linea 3182, blockGroup[0]: ' + blockGroup[0]);
		console.log('linea 3183, blockGroup[0].blockStyle.x: ' + blockGroup[0].blockStyle.x );
		//	console.log('linea 3184, blockGroup[0].blockStyle: ' + blockGroup[0].blockStyle);
	}
	var BlockFijo = blockGroup[0].blockStyle; //get the first block 
	
	//conver block to polygon
	poly = block2Polygon(BlockFijo); 		

	leftUpPos = getLeftUpPos(gPolyGroup[polyId].block);
	centerPos = getCenterPos(gPolyGroup[polyId].block);
	
	pos = getPolyInitPos(polyId);
	
	gPolyGroup[polyId].poly = new Kinetic.Polygon({
		x: pos.x,
		y: pos.y,
		points: poly,
		fill: colorSofter(blockGroup.color, 0.8),
		stroke: BLOCK_BORDER_COLOR,
		strokeWidth: 2,
		//offset = center position of polygon (relative to left-up position)
		offset: [ (centerPos.x+leftUpPos.x) * BLOCK_CELL_SIZE, (centerPos.y+leftUpPos.y) *  BLOCK_CELL_SIZE ],
		dragBoundFunc: function(pos) {
			return checkPolyBound(this, pos);
		}	
	});	
	
	poly = gPolyGroup[polyId].poly;
	poly.blockId = 0; //index for reference to gBlockGroup
	poly.polyId = polyId; //index for reference to gPolyGroup
	poly.pos = { x:-1, y:-1 }; //current polygen position in board
	poly.centerPos = centerPos;
	
	setShadow(poly);

	//hasRotate and hasFlip for display filp & rotate operator	
	poly.hasRotate = (blockGroup.blockStyle.length != 1);
	poly.hasFlip   = blockGroup.hasFlip;

	polyId++;

}

