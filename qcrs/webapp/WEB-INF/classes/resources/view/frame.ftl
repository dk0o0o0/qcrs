<div class="portal-frame clearfix">
	<ul class="portal-column ui-sortable">
		<li class="system-notice portlet">
			<@authorize ifAnyGranted="ROLE_ADMINISTRATOR">
			<div class="portlet-header">
				<i class="glyphicon glyphicon-pencil"></i>
				<span>系统公告编辑</span>
			</div>
			<div class="portlet-content">			
				<div class="ajaxpanel" data-url="<@url value="/common/setting/input/announcement?view=embedded&cssClass=htmlarea"/>"></div>	
			</div>	
			</@authorize>
			<@authorize ifNotGranted="ROLE_ADMINISTRATOR">
				 不是系统管理员
			</@authorize>
		</li>
	</ul>
</div>