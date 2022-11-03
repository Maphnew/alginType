var ApprovalLine = commonui.ApprovalLine;

$(document).ready(function(){

    var objRmk4Map = <@json.json value=metaStreamMacroContext.getCodeMap('1374') />;

    //    <#assign maxMultiProcessCount = (metaProperties['maximum.multi.process.count'])!'' />
    var maxMultiProcessCount = ${maxMultiProcessCount?string};

    var tabParam;
    var tabUi = { };

    var transLevel = <@json.json value=transLevel/>;
    var status = <@json.json value=status/>;
    var applicationType = <@json.json value=applicationType/>;
    var transType = <@json.json value=transType/>;
    var codeClass = <@json.json value=codeClass/>;
    var transferStatus = <@json.json value=transferStatus/>;

    var applicationTypeClassMap = { '0' : '', '1' : 'font_blue', '2': '', '3' : 'font_red' };

    function getCodeFormatter(codeMap){
        return function(row, cell, value, columnDef, dataContext){
            if(value && codeMap[value])
                return codeMap[value];
            else
                return '';
        };
    }

    function applicationTypeFormatter(row, cell, value, columnDef, dataContext){
        var strValue = '';
        var cssClass = '';
        if(value && applicationType[value]){
            strValue = applicationType[value];
            cssClass = applicationTypeClassMap[value];
            if(dataContext.curMy.indexOf('Y') > -1)
                cssClass += ' font_b';
        }
        return '<span class="'+cssClass+'">'+strValue+'</span>';
    }

    function changeStatusFormatter(row, cell, value){
        var strValue = '';
        var cssClass = '';
        if(value && status[value]){
            strValue = status[value];
            cssClass = commonui.codes.aplTypeStyleMap[value];
        }
        return '<span class="'+cssClass+'">'+strValue+'</span>';
    }

    function transStatusFormatter(row, cell, value, columnDef, dataContext){
        var cssClass = '';
        var strValue = '';
        if(value && value == 'F'){
            cssClass = 'font_red';
        }
        if(value && transferStatus[value]){
            strValue = transferStatus[value]
        }
        return '<span class="'+cssClass+'">'+strValue+'</span>';
    }

    window.refreshDomainTransferApplicationList = function(){
        $grid.msGrid('reload');
    }

	/**
	 * Init  List Grid
	 */
	var $grid = $('#grid').msGrid({
		url	: 'domainTransferApplicationList'
		,form	: $('#search-form')
		,options : { multiSelect : true }
		,columns : [
		            { name: '<@spring.message "A00615" />',                         field: 'rowSeq',	        width:50, 	 align:'center', resizable: false },    // 번호
		            { name: '<@spring.message "A00920" />',                         field: 'changeStatus',	    width:80, 	 align:'center', formatter : changeStatusFormatter },  // 신청종류
                    { name: '<@spring.message "A05500" />',          field: 'class_id', 	        width:100, 	align:'center', formatter : getCodeFormatter(codeClass) },                  // 통합코드유형
                    { name: '<@spring.message "word.or.ternname" />',                         field: 'termName', 	    width:200 	 },                                                                         // 통합코드명
                    { name: '<@spring.message "word.or.ternengname" />',  field: 'termEngName',     width:200, formatter : function(r, c, v, d, m){
                        if(m.class_id == 81){
                            return v ? objRmk4Map[v] : '';
                        }else{
                            return v;
                        }
                    }},                                                                         // 통합코드영문명
		            { name: '<@spring.message "A00885" />',                         field: 'systemName',	    width:100,   align:'center' },  // 시스템
		            { name: '<@spring.message "A00968" />',                         field: 'businessName',	    width:120,   align:'center'  },  // 업무구분
		            { name: '<@spring.message "A01143" />',                         field: 'transLevel', 	    width:80,	 align:'center', formatter : getCodeFormatter(transLevel) },  // 이관단계
                    { name: '<@spring.message "transfer.type" />',                  field: 'transType',	        width:80, 	 align:'center', formatter : getCodeFormatter(transType) },  // 전송유형
                    { name: '<@spring.message "A01326" />',                         field: 'applicationType',	width:80, 	 align:'center', formatter : applicationTypeFormatter },    // 처리상태
                    { name: '<@spring.message "A01740" />',                         field: 'transStatus',	    width:80, 	 align:'center', formatter : transStatusFormatter },    // 전송상태
                    { name: '<@spring.message "application.date.time" />',          field: 'createDate',	    width:100, 	 align:'center', formatter : commonui.formatters.dateTimeFormatter },    // 신청일
                    { name: '<@spring.message "A00919" />',                         field: 'createUser',	    width:100, 	 align:'center' }    // 신청자
		            ]
		,pager : '#pager'
		,tabs : '#tabs'
		,height : 300
        ,initGrid : false
        ,param: function(data){
            data.transLevel='1';
            return data;
        }
        ,checkBoxHandler : function(data){
            return data.curMy.indexOf('Y') > -1;
        }
	}).on('cellclick', function(evt,rowId,columnId,data){
        if(columnId == 11 && data.transStatus == 'F'){
            // 전송실패 상세로그 조회
            $.get('getFailLog?oi_id='+data.oi_id, function(data){
                if(data.log){
                    $('#failedLog').html(data.log);
                    $('#failedLogDialog').dialog('open');
                }
            }, 'json');
        }
    }).on('selectrow', function(evt, rowId, row){
    		tabParam = {
                oi_id : row.oi_id,
                object_id : row.object_id,
                transLevel : row.transLevel,
                version : row.version,
                full_cusr: row.createUser
            };

            var xhr1 = $.ajax({
                url : WEB_CONTEXT_PATH + 'standard/application/applicationInformation',
                data : {'object_id' : row.object_id}
            });

            $.when(xhr1)
            .then(function(args1) {
                $('#applicationInformation').html(args1); // 기본정보 탭 html 불러오기
                commonui.basicInfoRowSpanConfiguration()
            })


    		tabsselect(null, tabUi);
	}).searchByLocation();

    $('#failedLogDialog').dialog({
        autoOpen : false
        ,width : 800
        ,height : 500
        ,resizable : true
        ,modal : true
        ,buttons: {
            '<@spring.message "A00404"/>': function() {
                $(this).dialog('close');
            }
        }
    });

    function tabsselect(evt, ui){
        if(ui){
            if($(ui.newPanel).find('div.grid-wrapper').length){
                if(tabParam)
                    $(ui.newPanel).find('div.grid-wrapper').eq(0).msGrid('setParameters', tabParam).msGrid('reload');
                else
                    $(ui.newPanel).find('div.grid-wrapper').eq(0).msGrid('clearGridData');
            }
            tabUi = ui;
        }
    }

    $('#tabs').on('tabsactivate', tabsselect).on('tabsactivate', function(evt, ui){
        var $panel = $(ui.newPanel);
        if($panel.data('layout')){
            $panel.data('layout').resizeAll();
        }
    });

    var $approvalList = $('#approvalList');
    var approverChangeFormatter = ApprovalLine.applyChangeApprover($approvalList).formatter;

    /**
     * 결재현황목록
     * @type {*|jQuery}
     */
    $approvalList.msGrid({
        url	: 'codeTransferConfirmPathList'
        ,options : { }
        ,columns : [
            { name: '<@spring.message "A00615" />', width:50,   field : 'SEQ', align:'center', resizable: false },
            { name: '<@spring.message "A00284" />', width:100,  field : 'GUBUN_STR',    align:'center' },
            { name: '<@spring.message "A03065" />', width:100,  field : 'CONFIRM_STR',  align:'center' },
            { name: '<@spring.message "A00287" />', width:100,  field : 'STATUS_STR',   align:'center' },
            { name: '<@spring.message "A00295" />', width:120,  field : 'APR_NAME', align:'center', formatter: approverChangeFormatter },
            { name: '<@spring.message "A00294" />', width:150,  field : 'APR_TIME', align:'center' },
            { name: '<@spring.message "A01322" />', width:430,  field : 'REASON',   align:'left', formatter : commonui.formatters.tooltipFormatter }
        ]
        ,height	 : 200
    });

    function checkCount(rows){
        if(!rows.length){
            alert('<@spring.message "please.search.or.select"/>');
            return false;
        }
        if(rows.length > maxMultiProcessCount){
            alert('<@spring.messageArgs code="overflow.multi.process.count" args=[maxMultiProcessCount]/>');
            return false;
        }
        return true;
    }

    function checkAppliable(method){
        var rows = $('#grid').msGrid('getCheckedRowsData');
        if(!checkCount(rows)){
            return false;
        }

        var param = [];
        $.each(rows, function(){
            param.push(this.oi_id);
        });
        $.post('checkAppliable', { oi_id : param.join(',') }, function(data){
            if(data.result){
                method.call(this, param.join(','));
            }else{
                alert('<@spring.message "A01729"/>');
            }
        },'json')
        return true;
    }

    /**
     * 재전송
     */
    $('#resend-btn').click(function(){
        var rows = $('#grid').msGrid('getSelRowsData');
        if(!checkCount(rows)){
            return false;
        }
        var valid = true;
        $.each(rows, function(){
            if(this.applicationType!= '2'){
                alert('<@spring.message "deploy.applying.only"/>');
                valid = false;
                return false;
            }
            if(this.transStatus != 'F'){
                alert('<@spring.message "deploy.applying.notFailed"/>');
                valid = false;
                return false;
            }
        });
        if(valid){
            var param = [];
            $.each(rows, function(){
                param.push(this.oi_id);
            });
            openWinCenter( "resendView?oi_id="+param  , "resendView" , 'width=800, height=400, status=yes, toolbar=no , menubar=no , location=no' );
        }
    });

    /**
     * 즉시전송
     */
    $("#immediate-send-btn").click(function(){
        var rows = $('#grid').msGrid('getSelRowsData');
        if(!checkCount(rows)){
            return false;
        }

        var valid = true;
        $.each(rows, function(){
            if(this.applicationType!= '2'){
                alert('<@spring.message "deploy.applying.only"/>');
                valid = false;
                return false;
            }
            if(this.transStatus != 'R'){
                alert('<@spring.message "immediate.send.pending.only"/>');
                valid = false;
                return false;
            }
        });
        if(valid){
            var param = [];
            $.each(rows, function(){
                param.push(this.oi_id);
            });
            openWinCenter( "immediateSendView?oi_id="+param  , "immediateSendView" , 'width=800, height=400, status=yes, toolbar=no , menubar=no , location=no' );
        }
    });

	/**
	 * 승인
	 */
	$('#approve-btn').click(function() {
        checkAppliable(function(param){
            console.log(param);
		    openWinCenter( "approveView?oi_id="+param , "approveView" , 'width=800, height=450, status=yes, toolbar=no , menubar=no , location=no' );
        });
	});
	
	/**
	 * 반려
	 */
	$("#reject-btn").click(function(){
        checkAppliable(function(param){
            openWinCenter( "rejectView?oi_id="+param , "rejectView" , 'width=800, height=450, status=yes, toolbar=no , menubar=no , location=no' );
        });
	});
	
	/**
	 * 취소 
	 */
	$("#cancle-btn").click(function(){
        var rows = $('#grid').msGrid('getSelRowsData');
        if(!checkCount(rows)){
            return false;
        }
        var valid = true;
        $.each(rows, function(){
            if(this.user_object_id != '${userSession.userObjectId}'){
                alert('<@spring.messageArgs code="unalbe.to.cancel.request.table" args=[userSession?split("/")[0]] />'+'[<@spring.message "A00919"/> : ' + this.createUser.split('/')[0]+']');
                valid = false;
                return false;
            }else if(this.applicationType != '1'){
                alert('<@spring.message "A02158"/>');
                valid = false;
                return false;
            }
        });
        if(valid){
            var param = [];
            $.each(rows, function(){
                param.push(this.oi_id);
            });
            openWinCenter( "cancelView?oi_id="+param  , "cancelView" , 'width=800, height=400, status=yes, toolbar=no , menubar=no , location=no' );
        }
	});

    /**
     * 예약취소
     */
    $("#cancel-reserve-btn").click(function(){
        var rows = $('#grid').msGrid('getSelRowsData');
        if(!checkCount(rows)){
            return false;
        }
        var valid = true;
        $.each(rows, function(){
			// 전송유형(transType), 처리상태(applicationType)
			if(this.applicationType!= '2'){ // 처리상태 1:신청중, 2:승인, 3: 반려...
                if (this.applicationType == '1' && this.transType == '1') { // 1:즉시전송, 2:예약전송
					alert('<@spring.message "cancel.not.reservation.type"/>');
					valid = false;
					return false;
                } else {
					alert('<@spring.message "cancel.reservation.applying.only"/>');
					valid = false;
					return false;
                }
            }
            if(this.transStatus != 'R'){
                alert('<@spring.message "cancel.reservation.pending.only"/>');
                valid = false;
                return false;
            }
        });
        if(valid){
            var param = [];
            $.each(rows, function(){
                param.push({ oi_id: this.oi_id });
            });
            $.ajax({
                url: 'cancelReservation',
                type: 'POST',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                success: function(){
                    alert('<@spring.message "A01925"/>');
                    window.refreshDomainTransferApplicationList();
                }
            })

        }
    });

    commonui.basicInfoRowSpanConfiguration();

});

