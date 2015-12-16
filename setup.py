#!/usr/bin/env python
# -*- coding: utf-8 -*-

from setuptools import find_packages, setup

VERSION = '0.1.0'
PACKAGE_NAME = 'Plumb'

DESC = """ Editor statemachine.
"""

ENTRY_POINTS = {
    'trac.plugins': [
        'statemachine.web_ui = statemachine.web_ui',
    ],
}

setup(
    name=PACKAGE_NAME,
    version=VERSION,
    description="CAPA Ajax Editor Plugin.",
    author='Charlie Tian',
    author_email='rock.wang@spsoft-cn.com',
    license='BSD',
    url="http://www.spsoft-cn.com/",
    requires=['trac'],
    packages=find_packages(exclude=['ez_setup', 'examples', 'tests*']),
    package_data={
        'statemachine': [
            'templates/*.html',
            'htdocs/js/*.js',
            'htdocs/css/*.*',
            'htdocs/img/*.*',
            'htdocs/css/images/*.*',
            'locale/*/LC_MESSAGES/*.mo',
        ]
    },
    zip_safe=True,
    include_package_data=True,
    entry_points=ENTRY_POINTS,
    long_description=DESC,
)
