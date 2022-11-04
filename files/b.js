var isSubmitted = false;
var transLevel = <@json.json value=transLevel/>;
var status = <@json.json value=status/>;
var codeClass = <@json.json value=codeClass/>;

function getCodeFormatter(codeMap){
    return function(row, cell, value, columnDef, dataContext){
        if(value && codeMap[value])
            return codeMap[value];
        else
            return '';
    };
}
/**
 * 결과표시 Formatter
 * @param row
 * @param cell
 * @param value
 * @param columnDef
 * @param dataContext
 * @returns {string}
 */
function transferResultFormatter(row, cell, value, columnDef, dataContext) {
    if(isSubmitted){
        if(value){
            return '<span class="font_blue font_b" ><@spring.message "A01045"/></span>';
        }else{
            return '<span class="font_red font_b grid-content-tooltip" title="'+dataContext.transferMessages.join('<br>')+'"><@spring.message "A00929"/></span>';
        }
    }else{
        return '';
    }
}

/**
 * 처리 대상건 목록
 * @type {*|jQuery}
 */
var $codeGrid = $('#code-approve-grid').msGrid({
    url: 'codeTransferApplicationList',
    param : { oi_id : '${RequestParameters.oi_id}' },
    options: {},
    columns: [
        { name: '<@spring.message "A00615" />',                         field: 'rowSeq',	        width:50, 	 align:'center', resizable: false, formatter : commonui.formatters.seqFormatter },    // 번호
        { name: '<@spring.message "integration.code.type" />',          field: 'class_id',	        width:80, 	 align:'center', formatter : getCodeFormatter(codeClass) },    // 통합코드유형
        { name: '<@spring.message "A03915" />',                         field: 'changeStatus',	    width:80, 	 align:'center', formatter : getCodeFormatter(status) },  // 변경구분
        { name: '<@spring.message "word.or.ternname" />',                         field: 'termName',	    width:150 },    // 통합코드명
        { name: '<@spring.message "A01143" />',                         field: 'transLevel', 	    width:80,	 align:'center', formatter : getCodeFormatter(transLevel) },  // 이관단계
        { name: '<@spring.message "A00697" />',                         field: 'transferResult', 	width:200,	 align:'center', formatter : transferResultFormatter }
    ],
    initGrid : true,
    height : 200
}).msGrid('resizeCanvas');

/**
 * 닫기 버튼
 */
$('#close-btn').click(function(){
    closePopup();
});