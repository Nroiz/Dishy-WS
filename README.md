 
#Shankar web service Api service for final submission of Dishy:

##All address get JSON object, you can’t access the data without registering first to Dishy.

##Meals routes:

###Get all the meals that are offered in Dishy:

`http://mighty-dusk-71375.herokuapp.com/getAllMeals/` 


###Get a meal by meal id:

`http://mighty-dusk-71375.herokuapp.com/getMealbyID/:mid`


###Get meals by 2 tags:

Uses GET method.

By entering 2 tags you get the meals that answer your query.

`http://mighty-dusk-71375.herokuapp.com/getMealsByTags/:tagOne/:tagTwo`

example:

`http://mighty-dusk-71375.herokuapp.com/getMealsByTags/itlian/vegetarian`

###Get meal by one tag:

By entering a tag  you get all the meals that contains the same tag.

Uses GET method

`http://mighty-dusk-71375.herokuapp.com//getMealsByTags/:tag`

example

`http://mighty-dusk-71375.herokuapp.com//getMealsByTags/itlian`


###Get tags:

get the tags that are used to choose the meals.

Uses GET method.

`http://mighty-dusk-71375.herokuapp.com/getTags`


###review meals:

Uses POST method.

`http://mighty-dusk-71375.herokuapp.com/reviewMeal`

##Orders routes:

###Get all business orders by given business  id:

Uses POST method.

`http://mighty-dusk-71375.herokuapp.com/getBusinessOrders/:key`

###Get the order history by order key:

uses GET method.

`http://mighty-dusk-71375.herokuapp.com/getOrdersHistory/:key`


###Close an order:

Uses post:

`http://mighty-dusk-71375.herokuapp.com/closeOrder`

###Add an order:

uses post method

`http://mighty-dusk-71375.herokuapp.com/addorder`



##Account routes:

###Get account information:

Uses GET method.

`http://mighty-dusk-71375.herokuapp.com/getAccountInfo/:key`
