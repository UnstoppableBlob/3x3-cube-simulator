from copy import deepcopy



Y = "Yellow"
G = "Green"
B = "Blue"
O = "Orange"
R = "Red"
W = "White"


# cube = {
#     "yellow": [[Y, Y, Y,], 
#                [Y, Y, Y,],
#                [Y, Y, Y],],
#     "green": [[G, G, G,], 
#               [G, G, G,],
#               [G, G, G],],
#     "blue": [[B, B, B,], 
#              [B, B, B,],
#              [B, B, B],],
#     "orange": [[O, O, O,], 
#                [O, O, O,],
#                [O, O, O],],
#     "red": [[R, R, R,], 
#             [R, R, R,],
#             [R, R, R],],
#     "white": [[W, W, W,], 
#               [W, W, W,],
#               [W, W, W],],
# }

cube = {
    "yellow": [["Y00", "Y01", "Y02"],
               ["Y10", "Y11", "Y12"],
               ["Y20", "Y21", "Y22"],],
    "green": [["G00", "G01", "G02"],
              ["G10", "G11", "G12"],
              ["G20", "G21", "G22"],],
    "blue": [["B00", "B01", "B02"],
             ["B10", "B11", "B12"],
             ["B20", "B21", "B22"],],
    "orange": [["O00", "O01", "O02"],
               ["O10", "O11", "O12"],
               ["O20", "O21", "O22"],],
    "red": [["R00", "R01", "R02"],
            ["R10", "R11", "R12"],
            ["R20", "R21", "R22"],],
    "white": [["W00", "W01", "W02"],
              ["W10", "W11", "W12"],
              ["W20", "W21", "W22"],],
}

def turn_anticlockwise_all_data(front_face, top_face, right_face, bottom_face, left_face, reps=1):
    
    for i in range(reps):
        copy_top = deepcopy(cube[top_face])
        copy_bottom = deepcopy(cube[bottom_face])
        copy_left = deepcopy(cube[left_face])
        copy_right = deepcopy(cube[right_face])
        copy_front = deepcopy(cube[front_face])

        cube[front_face][2][0] = copy_front[2][2]
        cube[front_face][0][0] = copy_front[2][0]
        cube[front_face][2][2] = copy_front[0][2]
        cube[front_face][0][2] = copy_front[0][0]

        
        cube[front_face][1][0] = copy_front[0][1]
        cube[front_face][2][1] = copy_front[1][0]
        cube[front_face][0][1] = copy_front[1][2]
        cube[front_face][1][2] = copy_front[2][1]

        # for a in range(2):
        #     for b in range(2):
        #         cube[front_face][2-b][a] = copy_front[a][b]




        cube[top_face][2][0] = copy_right[0][0]
        cube[top_face][2][1] = copy_right[1][0]
        cube[top_face][2][2] = copy_right[2][0] 



        cube[left_face][0][2] = copy_top[2][0]
        cube[left_face][1][2] = copy_top[2][1]
        cube[left_face][2][2] = copy_top[2][2]


        cube[bottom_face][0][0] = copy_left[0][2]
        cube[bottom_face][0][1] = copy_left[1][2]
        cube[bottom_face][0][2] = copy_left[2][2]



        cube[right_face][0][0] = copy_bottom[0][0]
        cube[right_face][1][0] = copy_bottom[0][1]
        cube[right_face][2][0] = copy_bottom[0][2]


def turn_clockwise(front_face):
    if front_face == "yellow":
        turn_anticlockwise_all_data("yellow", "green", "red", "blue", "orange", 3)
    elif front_face == "green":
        turn_anticlockwise_all_data("green", "white", "red", "yellow", "orange", 3)
    elif front_face == "blue":
        turn_anticlockwise_all_data("blue", "white", "yellow", "green", "red", 3)
    elif front_face == "orange":
        turn_anticlockwise_all_data("orange", "blue", "white", "yellow", "green", 3)
    elif front_face == "red":
        turn_anticlockwise_all_data("red", "orange", "blue", "white", "yellow", 3)
    elif front_face == "white":
        turn_anticlockwise_all_data("white", "red", "orange", "blue", "yellow", 3)



def turn_anticlockwise(front_face):
    if front_face == "yellow":
        turn_anticlockwise_all_data("yellow", "green", "red", "blue", "orange")
    elif front_face == "green":
        turn_anticlockwise_all_data("green", "yellow", "orange", "white", "orange")
    elif front_face == "blue":
        turn_anticlockwise_all_data("blue", "white", "orange", "yellow", "red")
    elif front_face == "orange":
        turn_anticlockwise_all_data("orange", "yellow", "blue", "white", "green")
    elif front_face == "red":
        turn_anticlockwise_all_data("red", "yellow", "green", "white", "blue")
    elif front_face == "white":
        turn_anticlockwise_all_data("white", "red", "blue", "orange", "green")


# t perm

turn_anticlockwise("blue")
# turn_clockwise("yellow")
# turn_anticlockwise("blue")
# turn_anticlockwise("yellow")
# turn_anticlockwise("blue")
# turn_clockwise("orange")
# turn_clockwise("blue")
# turn_clockwise("blue")
# turn_anticlockwise("yellow")
# turn_anticlockwise("blue")
# turn_anticlockwise("yellow")
# turn_anticlockwise("blue")
# turn_clockwise("yellow")
# turn_anticlockwise("blue")
# turn_anticlockwise("orange")



def print_cube(cube):
    for face in cube.values():
        for row in face:
            print(" ".join(row))
        print()

print_cube(cube)

