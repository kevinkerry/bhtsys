/**
 * viewport导航条
 * @author lianglp
 * @version 1.0
 * @class com.bhtec.view.viewport.NavBar
 * @date 2010-05-30
 */
$import('./js/com/bhtec/view/viewport/general/DynamicChangeTree', 'js');
Ext.namespace('com.bhtec.view.viewport.general');
com.bhtec.view.viewport.general.NavBar = function(config) {
	//皮肤切换
	var cookie = new com.bhtec.util.Cookie();
	var changeSkinOp = function(item){
            Ext.util.CSS.swapStyleSheet('theme', 'ext/resources/css/' + item.id + '.css');
            //保存主题
            cookie.saveCookie(userCode_cookie+'_bht.theme', item.id);
    }
	var changeSkinMenu = new Ext.menu.Menu();
	var themes = com.bhtec.util.Data.themes;
    for (var i = 0; i < themes.length; i++){
    	var theme = themes[i];
    	var themeName = theme[1];
    	var themeValue = theme[2];
        changeSkinMenu.add({
        	id:themeValue,
            text: themeName,
            iconCls:'skinSelected',
            handler: changeSkinOp
        });
    }
    
     /**
     * 从cookie中获取主题
     * 后面的小括号表示立即执行该函数
     */
    var readThemeFromCookie = (function() {
        var themeValue = cookie.getCookie(userCode_cookie+'_bht.theme');
        if (themeValue) {
        	var themeValueId = {
        		id:themeValue
        	}
            changeSkinOp(themeValueId);
        }
    }).defer(0);
    
    /**
     * 常用功能菜单
     */
    var usedFunMenu = function(){
    	var munuItems = [{
			    	id:'pageLayout',
			        text: '页面布局 (F2)',
			        iconCls:'pagePattern',
			        handler: function(){
			        	var xmlDoc = loadXMLFile(pageLayoutConstant.XML_FILE);//加载模块xml
						loadModuleJs(xmlDoc);//动态加载js
			        	//模块页面
						var pageLayoutVOp = new com.bhtec.view.business.commonused.userpagelayout.UserPageLayout({xmlDoc:xmlDoc});
						pageLayoutVOp.funForm({});
			        }
	    		  },{
			    	id:'modifyUser',
			        text: '修改用户 (F3)',
			        iconCls:'user_edit',
			        handler: function(){
			        	var xmlDoc = loadXMLFile(userInfoModify.XML_FILE);//加载模块xml
						loadModuleJs(xmlDoc);//动态加载js
			        	//模块页面
						var userInfoModifyForm = new com.bhtec.view.business.commonused.userinfomodify.UserInfoModify({xmlDoc:xmlDoc});
						userInfoModifyForm.saveForm();
			        }
	    		  },{
			    	id:'usedFun',
			        text: '常用功能 (F4)',
			        iconCls:'usedfuncmaint',
			        handler: function(){
			        	loadModuleJsByJsPath(jsfile.COMMON_FUNCTION);//动态加载常用功能JS
			        	new com.bhtec.view.business.commonused.commonfuntion.UserCommonFunction();
			        }
	    		  },{
			    	id:'portalMaint',
			        text: 'portal维护 (F5)',
			        iconCls:'portal',
			        handler: ''
	    		  }];
	    if(changeRoleType != 'login'
	    			&& uumRoleUserRefList.length>1){
	    	munuItems.push({
			    	id:'multiRoleChanged',
			        text: '角色切换 (F6)',
			        iconCls:'rolemgr',
			        handler: function(){
			        	loadModuleJsByJsPath(jsfile.ROLE_CHANGE);//动态加载切换角色JS
			        	var roleChange = new com.bhtec.view.business.uum.role.RoleChange({
							        		uumRoleUserRefList:uumRoleUserRefList
							        	});
					    roleChange.roleSelectedWindow();
			        }
	    		  })
	    }
	    var usedMenu = new Ext.menu.Menu({
	    	items:munuItems
	    });
	    return usedMenu;
    }
    /**
     * 退出系统操作
     */
    var closeWin = function(){
    	var configClose = {
    		title:'退出系统',
    		msg:'您确认退出系统?',
    		fn:function(confirm){
    			if(confirm == 'ok')
    				window.close();
    		}
    	}
    	askMesg(configClose);
    }
    /**
     * 注销系统操作
     */
    var logout = function(){
    	var configLogout = {
    		title:'注销系统',
    		msg:'您确认注销系统?',
    		fn:function(confirm){
    			if(confirm == 'ok'){
    				window.close();
    				window.open('login.html');
    			}
    		}
    	}
    	askMesg(configLogout);
    }
    /**
     * 点击系统菜单改变outlook树结构
     */
    var dynamicChangeTree;
    if(basicConstant.WINXP == outlookBarMainFrame){//XP风格
    	dynamicChangeTree = new com.bhtec.view.viewport.winxp.DynamicChangeTree();	
    }else if(basicConstant.GENERAL == outlookBarMainFrame){//普通风格
    	dynamicChangeTree = new com.bhtec.view.viewport.general.DynamicChangeTree();
    }
    /**
     * 动态装载系统菜单
     */
    var loadMenuForSys = function(moduleId,modName,modImgCls){//moduleId系统模块id
				return function(){
					var leftMenu = getExtCmpById(basicConstant.LEFT_MENU_ID);//outlook菜单
					leftMenu.setTitle(modName);
					leftMenu.setIconClass(modImgCls);
					var items = leftMenu.items;
					items.each(function(item){//删除outlook菜单所有组件
						leftMenu.remove(item);
					});
					leftMenu.add(dynamicChangeTree.sysSecThiMenu(moduleId));//改变outlook菜单
					var viewPort = getExtCmpById(basicConstant.FRAME_VIEW_PORT_ID);//获得viewport
					viewPort.show();//重新show
					viewPort.doLayout();//重新布局
			    };
	}
	var userName = ''
	DWREngine.setAsync(false);
	baseInfoAction.getUserRoleOrgan(function(welcomeInfo){
		userName = welcomeInfo;
	});
	DWREngine.setAsync(true);
	var webQQ = function(){
		clientWin = new com.bhtec.view.util.qq.ClientWin({
                        currentUser: userName
                    });
        clientWin.show();
        //页面退出的时候
        dojo.addOnUnload(clientWin, "leave");
	}
    /**
     * 系统导航栏菜单，系统菜单为动态
     */
    var sysFirstMenu = function(){
    	var firstMenuArr = new Array();
    	var firstMenuList = firstMenu;
    	if(firstMenuList != ''){
			for(i=0;i<firstMenuList.length;i++){
				var moduleId = firstMenuList[i].moduleId;
				var modName = firstMenuList[i].modName;
				var modImgCls = firstMenuList[i].modImgCls;
				
				firstMenuArr.push({text:modName,iconCls:modImgCls,handler:loadMenuForSys(moduleId,modName,modImgCls)});
				firstMenuArr.push('-');
			}
    	}
    	firstMenuArr.push('->');
    	firstMenuArr.push({text:'帮助',tooltip:'帮助(F1)',iconCls:'help',handler:''},'-');
    	firstMenuArr.push({text:'WebQQ',tooltip:'WebQQ(F8)',iconCls:'qq',handler:webQQ},'-');
    	firstMenuArr.push({text:'常用',iconCls:'usedfunc',menu:usedFunMenu()},'-');
    	firstMenuArr.push({text:'皮肤',iconCls:'change_skin',menu:changeSkinMenu},'-');
    	firstMenuArr.push({text:'注销',tooltip:'注销(F6)',iconCls:'logout',handler:logout},'-');
    	firstMenuArr.push({text:'退出',tooltip:'退出(F7)',iconCls:'close',handler:closeWin},'-');
    	
    	return firstMenuArr;
    }
    /**
     * 导航面板
     */
	var navBarPanel = {
		xtype : 'toolbar',
		items:sysFirstMenu()
	}	
	return navBarPanel;
}