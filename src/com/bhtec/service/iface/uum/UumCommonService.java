/**
 *功能说明：
 * @author jacobliang
 * @time @Nov 17, 2010 @9:16:00 AM
 */
package com.bhtec.service.iface.uum;

import java.util.List;
import java.util.Map;

import com.bhtec.domain.pojo.uum.UumRoleUserRef;
import com.bhtec.domain.pojo.uum.UumUser;
import com.bhtec.domain.pojo.uum.UumUserCommfun;
import com.bhtec.exception.ApplicationException;
import com.bhtec.service.iface.BaseService;

public interface UumCommonService extends BaseService {
	/**
	 * 功能说明：根据用户ID查找用户的所有角色 
	 * 源自：RoleUserService 应用：LoginServiceImpl
	 * @author jacobliang
	 * @param userId	用户主键ID
	 * @return	用户角色关系记录
	 * @time Oct 9, 2010 3:52:47 PM
	 */
	public List<UumRoleUserRef> findRoleUserListByUserId(long userId);
	/**
	 * 功能说明：根据用户code和密码获得用户信息
	 * 源自：UserService 应用：LoginServiceImpl
	 * @author jacobliang
	 * @param userCode	用户登录名
	 * @param password	用户密码
	 * @return	UumUser	用户对象
	 * @time Nov 3, 2010 2:20:11 PM
	 */
	public UumUser findUserByUserCodeAPwd(String userCode,String password) throws ApplicationException;
	/**
	 * 功能说明：查询判断用户是否有特殊操作权限
	 * 源自：PrivilegeService 应用：LoginServiceImpl
	 * @author jacobliang
	 * @param userId		用户或角色ID
	 * @return true 有 false 无
	 * @time Nov 3, 2010 8:16:42 PM
	 */
	public boolean findUserHasSpecialPrivilege(long userId);
	/**
	 * 功能说明：根据登录的用户或角色ID 和 标识查询所有模块操作
	 * 源自：PrivilegeService 应用：LoginServiceImpl
	 * @author jacobliang
	 * @param ownerId			用户或角色ID
	 * @param privilegeType		为用户或角色标识
	 * @return modMenuMap:1-list;2-map;3-map;4-map
	 * @time Nov 1, 2010 11:29:03 AM
	 */
	public Map findUserModOptPriForLogin(long ownerId,String privilegeType);
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
