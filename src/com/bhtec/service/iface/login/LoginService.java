/**
 *功能说明：用户登录service
 * @author jacobliang
 * @time @Nov 3, 2010 @10:10:31 AM
 */
package com.bhtec.service.iface.login;

import java.util.List;
import java.util.Map;

import com.bhtec.domain.pojo.uum.UumRoleUserRef;
import com.bhtec.domain.pojo.uum.UumUser;
import com.bhtec.domain.pojo.uum.UumUserCommfun;
import com.bhtec.domain.pojo.uum.UumUserPageLayout;
import com.bhtec.exception.ApplicationException;
import com.bhtec.service.iface.BaseService;

public interface LoginService extends BaseService {
	/**
	 * 功能说明：根据用户code和密码获得用户信息
	 * @author jacobliang
	 * @param userCode		用户登录输入的名称
	 * @param password		用户密码
	 * @return UumUser		查询用户对象
	 * @time Nov 3, 2010 10:14:04 AM
	 */
	public UumUser obtainUserByUserCodePwd(String userCode,String password)throws ApplicationException;
	/**
	 * 功能说明：根据用户ID获得用户的角色机构信息
	 * @author jacobliang
	 * @param userId					用户ID
	 * @return	List<UumRoleUserRef>	用户角色机构信息
	 * @time Nov 3, 2010 10:25:38 AM
	 */
	public List<UumRoleUserRef> obtainRoleUserRefByUserId(long userId);
	/**
	 * 功能说明：根据登录用户ID或角色过滤模块操作权限
	 * @author jacobliang
	 * @param userId	用户ID
	 * @param roleId	角色ID
	 * @return	@return modMenuMap:1-list;2-map;3-map;4-map
	 * @time Nov 3, 2010 8:56:48 PM
	 */
	@SuppressWarnings("unchecked")
	public Map findFilterUserModOptPrivilege(long userId,long roleId);
	/**
	 * 功能说明：当登录用户为管理员时查询所有模块操作
	 * @author jacobliang
	 * @return @return modMenuMap:1-list;2-map;3-map;4-map
	 * @time Nov 4, 2010 1:28:07 PM
	 */
	@SuppressWarnings("unchecked")
	public Map findAllModuleOptForAdmin();
	/**
	 * 功能说明：根据用户ID查询用户常用功能
	 * @author jacobliang
	 * @param userId	用户ID
	 * @return
	 * @time Nov 26, 2010 11:00:32 AM
	 */
	public List<UumUserCommfun> findUserCommFunByUserId(long userId);
	/**
	 * 功能说明：删除用户无用常用功能
	 * @author jacobliang
	 * @param 	uumUserCommfunList		 用户常用功能列表
	 * @throws ApplicationException
	 * @time Nov 26, 2010 10:57:57 AM
	 */
	public void deleteUserCommFunById(List<UumUserCommfun> uumUserCommfunList)throws ApplicationException;
}
