/**
 * Created with JetBrains WebStorm.
 * User: psylinse
 * Date: 4/26/12
 * Time: 5:29 PM
 * To change this template use File | Settings | File Templates.
 */

function createRectangleBuffer(w, l){
    var squareBuffer = {
        vertexPositionBuffer : null,
        textureCoordBuffer : null,
        indexBuffer : null
    }

    squareBuffer.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer.vertexPositionBuffer);

    var vertices = [
        -w, -l,  0.0,
        w, -l,  0.0,
        w,  l,  0.0,
        -w,  l,  0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    squareBuffer.vertexPositionBuffer.itemSize = 3;
    squareBuffer.vertexPositionBuffer.numItems = 4;

    squareBuffer.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer.textureCoordBuffer);

    var textureCoords = [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ]

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
   squareBuffer.textureCoordBuffer.itemSize = 2;
    squareBuffer.textureCoordBuffer.numItems = 4;

    squareBuffer.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareBuffer.indexBuffer);

    var indeces = [ 0,1,2,  0,2,3];

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indeces), gl.STATIC_DRAW);
    squareBuffer.indexBuffer.itemSize = 1;
    squareBuffer.indexBuffer.numItems = 6;

    return squareBuffer;
}

function createCubeBuffer( w){

    var cubeBuffer = {
        vertexPositionBuffer : null,
        textureCoordBuffer : null,
        indexBuffer : null
    };

    cubeBuffer.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer.vertexPositionBuffer);
    w = 8000;
    var vertices = [
        // Front face
        -w, -w,  w,
        w, -w,  w,
        w,  w,  w,
        -w,  w,  w,

        // Back face
        -w, -w, -w,
        -w,  w, -w,
        w,  w, -w,
        w, -w, -w,

        // Top face
        -w,  w, -w,
        -w,  w,  w,
        w,  w,  w,
        w,  w, -w,

        // Bottom face
        -w, -w, -w,
        w, -w, -w,
        w, -w,  w,
        -w, -w,  w,

        // Right face
        w, -w, -w,
        w,  w, -w,
        w,  w,  w,
        w, -w,  w,

        // Left face
        -w, -w, -w,
        -w, -w,  w,
        -w,  w,  w,
        -w,  w, -w
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    cubeBuffer.vertexPositionBuffer.itemSize = 3;
    cubeBuffer.vertexPositionBuffer.numItems = 24;

    cubeBuffer.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer.textureCoordBuffer);
    var textureCoords = [
        // Front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        // Back face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,

        // Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        // Right face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    cubeBuffer.textureCoordBuffer.itemSize = 2;
    cubeBuffer.textureCoordBuffer.numItems = 24;

    cubeBuffer.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeBuffer.indexBuffer);
    var cubeVertexIndices = [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    cubeBuffer.indexBuffer.itemSize = 1;
    cubeBuffer.indexBuffer.numItems = 36;

    return cubeBuffer;
}

function createSphereBuffer( radius){

    var sphereBuffer = {
        vertexPositionBuffer : null,
        textureCoordBuffer : null,
        indexBuffer : null,
        normalBuffer : null
    }

    var latitudeBands = 30;
    var longitudeBands = 30;

    var vertexPositionData = [];
    var normalData = [];
    var textureCoordData = [];
    for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
            var phi = longNumber * 2 * Math.PI / longitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;
            var u = 1 - (longNumber / longitudeBands);
            var v = 1 - (latNumber / latitudeBands);

            normalData.push(x);
            normalData.push(y);
            normalData.push(z);
            vertexPositionData.push(radius * x);
            vertexPositionData.push(radius * y);
            vertexPositionData.push(radius * z);
        }
    }

    var indexData = [];
    for (var latNumber=0; latNumber < latitudeBands; latNumber++) {
        for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
            var first = (latNumber * (longitudeBands + 1)) + longNumber;
            var second = first + longitudeBands + 1;
            indexData.push(first);
            indexData.push(second);
            indexData.push(first + 1);

            indexData.push(second);
            indexData.push(second + 1);
            indexData.push(first + 1);
        }
    }

    sphereBuffer.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
    sphereBuffer.normalBuffer.itemSize = 3;
    sphereBuffer.normalBuffer.numItems = normalData.length / 3;

    sphereBuffer.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
    sphereBuffer.vertexPositionBuffer.itemSize = 3;
    sphereBuffer.vertexPositionBuffer.numItems = vertexPositionData.length / 3;

    sphereBuffer.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereBuffer.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
    sphereBuffer.indexBuffer.itemSize = 1;
    sphereBuffer.indexBuffer.numItems = indexData.length;

    return sphereBuffer;
}
