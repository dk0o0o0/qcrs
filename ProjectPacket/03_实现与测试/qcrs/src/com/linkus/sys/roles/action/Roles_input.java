package com.linkus.sys.roles.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class Roles_input extends HttpServlet {

	private static final long serialVersionUID = 4452020821062232441L;

	private Configuration conf;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		//建立数据模型
		Map<String,String> map = new HashMap<String,String>();
		
		//取得模版文件
		Template t = conf.getTemplate("Roles_input.ftl");
		
		/*开始准备生成输出
		 *使用模版文件的charset作为本页面的charset
		*/
		resp.setContentType("text/html;charset="+t.getEncoding());
		
		PrintWriter out = resp.getWriter();
		
		/*合并数据模型和模版，并将结果输出到out中*/
		try {
			t.process(map, out);
		} catch (TemplateException e) {
			throw new ServletException("处理Template模版中出现错误！");
		}
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	
	}

	@Override
	public void init() {
		conf = new Configuration();
		conf.setServletContextForTemplateLoading(getServletContext(), "templates");
	}

	public Configuration getConf() {
		return conf;
	}

	public void setConf(Configuration conf) {
		this.conf = conf;
	}
	
	
}
