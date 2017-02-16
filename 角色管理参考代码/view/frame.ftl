<div class="portal-frame clearfix">
	<ul class="portal-column ui-sortable">
		<li class="backlog portlet">
			<div class="portlet-header">
				<i class="glyphicon glyphicon-time"></i>
				<span>待办事项</span>
			</div>
			<div class="content">
				<div class="backlog-div">您有 <div class="ajaxpanel backlog-count" data-interval="60000" data-url="<@url value="/tasklist"/>"></div> 个待办事项</div>
				<div>
					<i class="glyphicon glyphicon-hand-right"></i>
					<a href="#" class="view" realtitle="待办任务" title="/cpms/linkus/capital/workflow/taskProcess/todotabs" >点击马上处理</a>
				</div>
			</div>
		</li>
		<li class="warning-list portlet">
			<div class="portlet-header">
				<i class="glyphicon glyphicon-bell"></i>
				<span>提醒事项</span>
			</div>
			<div class="ajaxpanel" data-interval="60000" data-url="<@url value="/remindlist"/>"></div>
		</li>
	</ul>
	<ul class="portal-column ui-sortable">
		<li class="info-list portlet">
			<div class="portlet-header">
				<i class="glyphicon glyphicon-bullhorn"></i>
				<span>信息公告</span>
			</div>
			<div class="content"><@printSetting key="announcement"/></div>
		</li>
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