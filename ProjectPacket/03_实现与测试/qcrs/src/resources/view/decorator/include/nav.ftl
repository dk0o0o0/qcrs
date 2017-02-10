<div class="easyui-accordion"  style="width:100%;">
	<div  title="${action.getText("index")}">
		<a href="<@url value="/frame#"/>" class="view" style="margin-left:2px;"><i class="circle-full"></i><span>${action.getText("index")}</span></a>
	</div>
	<div title="系统管理">
    	<ul>  		
    		<li><a href="#" title="<@url value="/user"/>" class="view"><i class="circle-full"></i><span>系统用户管理</span></a></li>
    		<li><a href="#" title="<@url value="/proBasicDept"/>" class="view"><i class="circle-full"></i><span>机构管理</span></a></li>
    		<li><a href="#" title="<@url value="/dept"/>" class="view"><i class="circle-full"></i><span>${action.getText('dept')}</span></a></li>
    		<li><a href="#" title="<@url value="/roles"/>" class="view"><i class="circle-full"></i><span>角色管理</span></a></li>
    		<li><a href="#" title="<@url value="/users"/>" class="view"><i class="circle-full"></i><span>用户管理</span></a></li>
    		<li><a href="#" title="<@url value="/single"/>" class="view"><i class="circle-full"></i><span>单实体测试</span></a></li>
    		<li><a href="#" title="<@url value="/multi"/>" class="view"><i class="circle-full"></i><span>多实体</span></a></li>
    		<li><a href="#" title="<@url value="/multi"/>" class="view"><i class="circle-full"></i><span>多实体测试</span></a></li>
  		</ul>
	</div>
	<div title="用户信息维护">
    	<ul>  		
    		<li><a href="#" title="<@url value="/proBasicUser"/>" class="view"><i class="circle-full"></i><span>用户信息维护</span></a></li>
  		</ul>
	</div>	
</div>
