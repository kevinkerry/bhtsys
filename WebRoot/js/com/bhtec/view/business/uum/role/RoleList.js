/**
 * 角色管理列表页面
 * @author lianglp
 * @version 1.0
 * @class com.bhtec.bussiness.uum.role.RoleList
 * @date 2010-09-23
 */
Ext.namespace('com.bhtec.view.business.uum.role');
com.bhtec.view.business.uum.role.RoleList = function(config){
	var xmlDoc = config.xmlDoc;//域描述信息
	var roleName_q = 'roleName_q';
	var roleGridId = 'roleGridId';
	
	/**
	 * 查询条件
	 */
	var queryCondition = function(){ 
		var queryArr = new Array();
		queryArr.push({
					border : false,
					layout : 'form',
					columnWidth : 0.3,
					items : [com.bhtec.view.util.CommonWidgets.prototype.textField({
								id:roleName_q,
								width:150,
								fieldLabel : getFormFieldName(xmlDoc,'roleName'),
								listeners: {
					                specialkey: function(field, e){
					                    if (e.getKey() == e.ENTER) {
					                       query();
					                    }
					                }
					            }
							})]
				});
		return queryArr;
	}
	/**
	 * 查询操作
	 */
	var query = function(){	
		var configQuery = {
				url : 'roleAction!findRoleByCon.action',
				params : {
					roleName : getExtCmpValueById(roleName_q)
				},
				callBack : function(returnData) {
					queryFillGridList(roleGridId,returnData);
				}
			}
			ajaxRequest(configQuery);
	}
	/**
	 * 重置查询
	 */
	var reset = function(){
		resetCmpValueById(roleName_q);
	}
	/**
	 * 模块列模式
	 */
	var cols = function(){
		var colsArr = new Array();
		colsArr.push({
				header : 'roleId',
				dataIndex : 'roleId',
				hidden:true,
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true 
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'roleName'),
				dataIndex : 'roleName',
				width : basicConstant.GRID_COL_WIDTH+50,
				sortable: true 
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'roleLevel'),
				dataIndex : 'roleLevel',
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true,
				renderer:function(data){
					var numberr = com.bhtec.util.Data.number;
					for(i=0;i<numberr.length;i++){
						if(data == numberr[i].num){
							return numberr[i].numName;
						}
					}
				}
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'status'),
				dataIndex : 'status',
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true,
				renderer:function(data){
					var status = com.bhtec.util.Data.status;
					for(i=0;i<status.length;i++){
						if(data == status[i].status){
							return status[i].statusName;
						}
					}
				}
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'creator'),
				dataIndex : 'creator',
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true 
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'createDate'),
				dataIndex : 'createDate',
				width : 200,
				sortable: true
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'memo'),
				dataIndex : 'memo',
				width : 200,
				sortable: true
			});
		
		return colsArr;
	}
	 /**
	  * 模块grid store
	  */
    var listStore = new Ext.data.JsonStore({
				fields : ['roleId','roleLevel', 'roleName','memo', 
						  'status','creator','createDate'],
				autoLoad : true,
				totalProperty : 'count',
				root : 'roleList',
				url : 'roleAction!findRoleByCon.action'
			});
			
	
	
	/**
	 * 为翻页加自定义参数
	 */
    listStore.on('beforeload', function(thiz,options) {
    	var new_params = {
						roleName : getExtCmpValueById(roleName_q)
					}; 
		Ext.apply(options.params,new_params); 
	});	
	/**
	 * 角色分配模块操作权限
	 */
	var roleAssignModOptPri = function(){
			var modDelRecord = modifyDelSelRecord(roleGridId);//请选择一条件记录
			if(modDelRecord != ''){
						new com.bhtec.view.business.uum.role.RoleAssignModOpt({
								roleName:modDelRecord.roleName,
								roleId:modDelRecord.roleId
							});
			}
	}
	/**
	 * 工具栏按钮
	 */	
    var toolbar = function(){
		var frametoolbar = new Array();
		var modOptList = fourthModOpt[config.moduleId];
		for(i=0;i<modOptList.length;i++){
			var modOpt = modOptList[i];
			var handlerFun = '';
			if(basicConstant.ADD_OPT_LINK == modOpt.optFunLink){
				handlerFun = config.moduleForm.saveForm;
			}else if(basicConstant.MODIFY_OPT_LINK == modOpt.optFunLink){
				handlerFun = config.moduleForm.modifyForm;
			}else if(basicConstant.DELETE_OPT_LINK == modOpt.optFunLink){
				handlerFun = config.moduleForm.delRecord;
			}else if(basicConstant.VIEW_OPT_LINK == modOpt.optFunLink){
				handlerFun = config.moduleForm.viewForm;
			}else if(basicConstant.ENABLE_OPT_LINK == modOpt.optFunLink){
				handlerFun = function(){config.moduleForm.disEnable(basicConstant.ENABLE_OPT_LINK)};
			}else if(basicConstant.DISABLE_OPT_LINK == modOpt.optFunLink){
				handlerFun = function(){config.moduleForm.disEnable(basicConstant.DISABLE_OPT_LINK)};
			}else if(basicConstant.OPTPRI_OPT_LINK == modOpt.optFunLink){
				handlerFun = roleAssignModOptPri;
			}
			frametoolbar.push({
				text:modOpt.modName,
				iconCls:modOpt.modImgCls,
				handler:handlerFun
			},'-');
		}
		
		return frametoolbar;
	};
	
	
	/**
	 * 查询区
	 */
	var queryPara = {
			query:query,
			reset:reset,
			queryCondition:queryCondition(),
			queryColWidth:0.2,
			currentPosition:basicConstant.UUM+'角色管理->角色信息管理'
	}
	/**
	 * 列表区
	 */
	var gridListPara = {
			cols:cols(),
			store:listStore,
			gridId	:	roleGridId,
			width	: 	basicConstant.BODY_WIDTH
	}
	/**
	 * 按钮区
	 */
	var toolbarPara = {
		toolbar		:	toolbar(),
		saveForm	:	config.moduleForm.saveForm,
//		delRecord	:	config.moduleForm.delRecord,
		modifyForm	:	config.moduleForm.modifyForm,
		viewForm	:	config.moduleForm.viewForm
	}
	/**
	 * 整个列表
	 */
	var configList = {
			queryPara:queryPara,
			toolbarPara:toolbarPara,
			gridListPara:gridListPara
	}	
	return configList;
}
