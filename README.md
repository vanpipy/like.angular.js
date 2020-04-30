# Like AngularJS
Just like AngularJS.

# The meaning of the AngularJS
+ What is the AngularJS?
    - AngularJS began in 2009.
    - AngularJS is a javascript-based open-source front-end web application framework mainly maintained by Google and by a community of individuals and corporations to address many of the challenges encounterd in developing single-page applications.
    - AngularJS aims to simplify both the development and the testing of such applications by providing a framework for client-side model-view-controller(MVC) and model-view-viewmodel(MVVM) architectures.
    - In 2014, the original AngularJS team began working on Angular.
+ what is the problem solved by AngularJS?
    - to decouple DOM manipulation from application logic. The difficulty of this is dramatically affected by the way the code is structured.
    - to decouple the client side of an application from the server side. This allows development work to progress in parallel, and allows for reuse of both sides.
    - to provide structure for the journey of building an application: from designing the UI, through writing the business logic, to testing.

# How to structure LikeAngularJS
```

                                          UPDATE
                              ----------------------------------
                              |                                |
                              v                                |
                        --------------                     ---------         ---------
                     /  |    HTML    |     DATA-BINDING    | View  |  ---->  |       |
Template[View]  <----   --------------   <-------------->  |   |   |         | Model |
                     \  | JAVASCRIPT |                     | Model |  <----  |       |
                        --------------                     ---------         ---------
                              |                                ^
                              |                                |
                              ----------------------------------
                                        MANIPULATE

The data-binding replace of the MVC's update and manipulate in MVVM.
```

# LikeAngularJS Structure

Q:What is the content of the web page?
A:HTML
Q:How to manipulate the web page content?
A:Javascript

The questions tell something about how to struct the `MV*` model. HTML is main content for the view and Javascript is the main way for the model and the controller.

# What is the content of the LikeAngualrJS?
1.Compiler
2.Injector
3.Provider
4.Controller
5.Service
6.Scope
7.Directive
8.LiteNode
9.Like

# Practice
[Simplified AngularJS](http://blog.mgechev.com/2015/03/09/build-learn-your-own-light-lightweight-angularjs/)
