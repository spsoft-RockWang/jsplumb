from trac.core import *
from trac.web import IRequestFilter
from trac.web.chrome import INavigationContributor, ITemplateProvider, add_script, add_stylesheet
from trac.web.main import IRequestHandler
from pkg_resources import resource_filename
from trac.util import escape, Markup


class index(Component):
	implements(IRequestHandler, ITemplateProvider)
	# IRequestHandler methods
	def match_request(self, req):
		if req.path_info == '/a1':
			return True

	def process_request(self, req):
		add_stylesheet(req, 'statemachine/css/jsplumb.css')
		add_stylesheet(req, 'statemachine/css/demo.css')

		add_script(req, 'statemachine/js/jquery.min.js')
		add_script(req, 'statemachine/js/jquery-ui-1.9.2.min.js')
		add_script(req, 'statemachine/js/jsBezier-0.6.js')
		add_script(req, 'statemachine/js/biltong-0.2.js')
		add_script(req, 'statemachine/js/util.js')
		add_script(req, 'statemachine/js/dom-adapter.js')
		add_script(req, 'statemachine/js/jsPlumb.js')
		add_script(req, 'statemachine/js/endpoint.js')
		add_script(req, 'statemachine/js/connection.js')
		add_script(req, 'statemachine/js/anchors.js')
		add_script(req, 'statemachine/js/defaults.js')
		add_script(req, 'statemachine/js/connectors-bezier.js')
		add_script(req, 'statemachine/js/connectors-statemachine.js')
		add_script(req, 'statemachine/js/connectors-flowchart.js')
		add_script(req, 'statemachine/js/connector-editors.js')
		add_script(req, 'statemachine/js/renderers-svg.js')
		add_script(req, 'statemachine/js/renderers-vml.js')
		add_script(req, 'statemachine/js/jquery.jsPlumb.js')
		add_script(req, 'statemachine/js/demo.js')

		return 'jsplumb.html', {}, None

	def get_htdocs_dirs(self):
		return [
			('statemachine', resource_filename('statemachine', 'htdocs'))]

	def get_templates_dirs(self):
		return [resource_filename('statemachine', 'templates')]

