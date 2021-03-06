jsPlumb.ready(function () {
    // setup some defaults for jsPlumb.
    var instance = jsPlumb.getInstance({
        Endpoint: ["Dot", {radius: 2}],
        Connector:"StateMachine",
        HoverPaintStyle: {strokeStyle: "#1e8151", lineWidth: 2},
        ConnectionOverlays: [
            ["Arrow", {
                location: 1,
                id: "arrow",
                length: 14,
                foldback: 0.8
            }],
            ["Label", {label: "FOO", id: "label", cssClass: "aLabel"}]
        ],
        Container: "canvas"
    });

    var windows = jsPlumb.getSelector(".statemachine-demo .w");

    // initialise draggable elements.

    instance.draggable(windows);


    var newNode = function (x, y,name) {
        var d = document.createElement("div");
        var id = jsPlumbUtil.uuid();
        d.className = "w";
        d.id = id;
        d.innerHTML = name + "<div class=\"ep\"></div>";
        d.style.left = x + "px";
        d.style.top = y + "px";
        instance.getContainer().appendChild(d);
        initNode(d);
        return d;
    };


    var newNodeadd = function (x, y, list) {

        for (var i = 0; i < list.length; i++) {
            var d = document.createElement("div");
            var id = jsPlumbUtil.uuid();
            d.className = "w";
            d.id = id;
            d.innerHTML = list[i]  + "<div class=\"ep\"></div>";
            d.style.left = (x+i*10) + "px";
            d.style.top = (y+i*10) + "px";
            instance.getContainer().appendChild(d);
            initNode(d);
        }
        return d;
    };
        var initNode = function(el) {

        // initialise draggable elements.
        instance.draggable(el);

        instance.makeSource(el, {
                filter: ".ep",
                anchor: "Continuous",
                connector: ["StateMachine", {curviness: 20}],
                connectorStyle: {strokeStyle: "#5c96bc", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4},
                maxConnections: 5,
                onMaxConnections: function (info, e) {
                    alert("Maximum connections (" + info.maxConnections + ") reached");
                }
        });

        instance.makeTarget(el, {
            dropOptions: { hoverClass: "dragHover" },
            anchor: "Continuous",
            allowLoopback: true
        });

        // this is not part of the core demo functionality; it is a means for the Toolkit edition's wrapped
        // version of this demo to find out about new nodes being added.
        //
        instance.fire("jsPlumbDemoNodeAdded", el);
    };

    // bind a click listener to each connection; the connection is deleted. you could of course
    // just do this: jsPlumb.bind("click", jsPlumb.detach), but I wanted to make it clear what was
    // happening.
    //删除连线
    instance.bind("click", function (c) {
        instance.detach(c);
    });

    // bind a connection listener. note that the parameter passed to this function contains more than
    // just the new connection - see the documentation for a full list of what is included in 'info'.
    // this listener sets the connection's internal
    // id as the label overlay's text.
    instance.bind("connection", function (info) {
        info.connection.getOverlay("label").setLabel(info.connection.id);
    });


 var a= function(){
     var a = $('#canvas div');
        var b = [];
        var ii=0;
        for (var i = 0; i < a.length; i++) {
            if(a[i].id == "first"){
                console.log(a[i]);
            }
           else if(a[i].id == ""){
                 console.log(a[i]);
            }else{
                 b[ii] = a[i].id
                 ii++;
            }
        }
    var voption="";
    for(var i=0;i< b.length;i++){
         voption += "<option value=" + b[i] + ">" + b[i] + "</option>";
    }
 $(".selectid").append(voption);

}

    a();


    jsPlumb.on($('#button'), "click", function (e) {
        var name = $('#name').val();
        newNode(e.offsetX, e.offsetY, name);
        $('#name').val("");
        $('.selectid').empty();
        a();

    });

    jsPlumb.on($('#addall'), "click", function (e) {
        var addlist= $('#addlist').val();
        list = addlist.split(',');
        newNodeadd(e.offsetX, e.offsetY, list);
        $('.selectid').empty();
        a();
    });

    jsPlumb.on($("#buttonde"), "click", function (e) {//
        var name = $('#namede').val();
        //$("#canvas").select(name).remote();
        $('#' + name).remove();
        $('.selectid').empty();
        a();
    });


    //jsPlumb.on($("#canvas"), "dblclick", function (e) {
    //   var idid= $(e.target).attr('id');
    //    if(idid != "canvas"){
    //       $('#'+idid).remove();
    //    }
    //    $('.selectid').empty();
    //    a();
    //});

    jsPlumb.on($('#delectall'), "click", function (e) {
        $("#first").nextAll().remove();
        $('.selectid').empty();
        a();
    });



    jsPlumb.on($('#btncon'), "click", function (e) {
        var startid = $("#startid").val();
        var endid = $("#endid").val();
         instance.connect({source: startid, target: endid});
    });

    jsPlumb.on($('#con'), "click", function (e) {
        var con1=["phone1","phone2"];
        var con2=["phone2","inperson"];
        for(i=0;i<con1.length;i++){
        var startid = con1[i];
        var endid = con2[i];
         instance.connect({source: startid, target: endid});
            }
    });

    // suspend drawing and initialise.
    instance.doWhileSuspended(function () {
        var isFilterSupported = instance.isDragFilterSupported();
        // make each ".ep" div a source and give it some parameters to work with.  here we tell it
        // to use a Continuous anchor and the StateMachine connectors, and also we give it the
        // connector's paint style.  note that in this demo the strokeStyle is dynamically generated,
        // which prevents us from just setting a jsPlumb.Defaults.PaintStyle.  but that is what i
        // would recommend you do. Note also here that we use the 'filter' option to tell jsPlumb
        // which parts of the element should actually respond to a drag start.
        // here we test the capabilities of the library, to see if we
        // can provide a `filter` (our preference, support by vanilla
        // jsPlumb and the jQuery version), or if that is not supported,
        // a `parent` (YUI and MooTools). I want to make it perfectly
        // clear that `filter` is better. Use filter when you can.
        if (isFilterSupported) {
            instance.makeSource(windows, {///2222222
                filter: ".ep",
                anchor: "Continuous",
                connector: ["StateMachine", {curviness: 20}],
                connectorStyle: {strokeStyle: "#5c96bc", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4},
                maxConnections: 5,
                onMaxConnections: function (info, e) {
                    alert("Maximum connections (" + info.maxConnections + ") reached");
                }
            });
        }
        else {
            var eps = jsPlumb.getSelector(".ep");
            for (var i = 0; i < eps.length; i++) {
                var e = eps[i], p = e.parentNode;
                instance.makeSource(e, {//3333333
                    parent: p,
                    anchor: "Continuous",
                    connector: ["StateMachine", {curviness: 20}],
                    connectorStyle: {
                        strokeStyle: "#5c96bc",
                        lineWidth: 2,
                        outlineColor: "transparent",
                        outlineWidth: 4
                    },
                    maxConnections: 5,
                    onMaxConnections: function (info, e) {
                        alert("Maximum connections (" + info.maxConnections + ") reached");
                    }
                });
            }
        }
    });

    // initialise all '.w' elements as connection targets.
    instance.makeTarget(windows, {
        dropOptions: {hoverClass: "dragHover"},
        anchor: "Continuous"
    });

    // and finally, make a couple of connections
    //instance.connect({source: "opened", target: "phone1"});
    //instance.connect({source: "phone1", target: "phone1"});
    //instance.connect({source: "phone1", target: "inperson"});
    // instance.connect({source: "phone1", target: "rejected"});

    jsPlumb.fire("jsPlumbDemoLoaded", instance);

});
