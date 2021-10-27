var documenterSearchIndex = {"docs":
[{"location":"apidocs/#API-documentation","page":"API documentation","title":"API documentation","text":"","category":"section"},{"location":"apidocs/","page":"API documentation","title":"API documentation","text":"probNFE","category":"page"},{"location":"apidocs/#NeuralFieldEq.probNFE","page":"API documentation","title":"NeuralFieldEq.probNFE","text":"probNFE(input)\n\nSet the NFE problem by discretising the domain, initialising sv and k_delay and building the delay rings structure.\n\nReceive as input the parameters and functions wrapped in structures Input1D and Input2D. According to the space dimension the inputs are wrapped in the corresponding structure. The arguments of Input1D and Input2D are:\n\nArguments\n\nα  :: AbstractFloat\nv  :: AbstractFloat\nV0 :: fV0: Can be a number or a function\nL  :: Number\nN  :: Integer\nT  :: AbstractFloat\nn  :: Integer\nI  :: fI: External input function\nK  :: fK: Connectivity function\nS  :: fS: Firing rate function\n\nReturn a structure to be used in solveNFE and prints useful information about the problem.\n\nExamples\n\njulia> # 2D example\njulia> I(x,y,t) = 0                      # External inut\njulia> # In 2D even if I doesn't depend on x,y and t, these three arguments are mandatory\njulia> K(x,y)   = exp(-x^2+y^2)          # Connectivity function\njulia> S(V)     = convert(Float64,V>0.0) # Firing rate. Heavyside function H(V)\n\njulia> α  = 1.0   # Constant decay      (must be float)\njulia> v  = 20.0  # Finite axonal speed (must be float)\njulia> V0 = 0.0   # Initial condition (can be a constant or a function)\njulia> L  = 100   # Domain length     (can be a integer or float)\njulia> N  = 512   # Number of nodes to discretise space (must be integer)\njulia> T  = 20.0  # Time span (must be float)\njulia> n  = 200   # Number of nodes to discretise time  (must be integer)\n\njulia> input = Input2D(α,v,V0,L,N,T,n,I,K,S);\njulia> prob  = probNFE(input)\n├─ Domain:       Ω × [0,T] = [-50.0,49.8046875]^2 × [0,20.0]\n├─ Spatial step: dx   = 0.1953125\n├─ Time step:    dt   = 0.1\n├─ Velocity:     v    = 20.0\n├─ Delay rings:  umax = 36\n\nFor the 1D scenario the procedure is the same, with exception that the functions I and K must be declared as I(x,t) and K(x) using Input1D.\n\n\n\n\n\n","category":"function"},{"location":"apidocs/","page":"API documentation","title":"API documentation","text":"solveNFE","category":"page"},{"location":"apidocs/#NeuralFieldEq.solveNFE","page":"API documentation","title":"NeuralFieldEq.solveNFE","text":"solveNFE(problem,saveat)\n\nArguments:\n\nproblem :: ProbOutput1D: Output of probNFE with Input1D \nproblem :: ProbOutput2D: Output of probNFE with Input2D\nsaveat  :: AbstractVector: Vector containing the instants where the solution is saved at\n\nReturn a structure containing the solution to the NFE problem saved at saveat instants. Also return x,y,t and saveat to help plotting solutions.\n\nThe output structure is defined with methods that return the solution at saveat instant j.\n\nExamples\n\njulia> sol = solveNFE(prob1D,[5.0,20.0]) # Deterministic solution saved at t=5 and t=20\njulia> sol(2)    # Solution at time instant t=20\njulia> sol(20.0) # Same result from above\njulia> using Plots\njulia> plot(sol.x,sol(20.0),title=\"Solution at t=20\")\n\nIf the problem is in 1D the solution will be a vector, if it is in 2D will be a matrix.\n\n\n\nsolveNFE(problem,saveat,ϵ,np,ξ=0.1)\n\nSolve stochastic version of an NFE for np trajectories, noise level ϵ and correlation ξ.\n\nArguments:\n\nproblem :: ProbOutput1D: Output of probNFE with Input1D \nproblem :: ProbOutput2D: Output of probNFE with Input2D\nsaveat  :: AbstractVector: Vector containing the instants where the solution is saved at\nϵ       :: Number: Level of additive noise\nnp      :: Integer: Number of simulations\nξ       :: AbstractFloat=0.1: Spatial correlation parameter\n\nReturn a structure containing the mean solution and the trajectories to the NFE problem saved at saveat instants. Also return x,y,t and saveat to help plotting solutions.\n\nThe output structure is defined with methods that return the path at saveat instant j at trajectory p and the mean solution at instant j.\n\nExamples\n\njulia> sol_sto = solveNFE(prob,[5.0,20.0],0.01,100)\njulia> # Stochastic solution saved at t=5,20, with noise level 0.01 simulated 100 times.\njulia> sol_sto(2,4)    # Fourth path at time instant t=20\njulia> sol_sto(20.0,4) # Same result from above\njulia> sol_sto(1)   # Mean solution at time instant t=20\njulia> sol_sto(5.0) # Same result from above\n\nIf the problem is in 1D the solution will be a vector, if it is in 2D will be a matrix.\n\n\n\n\n\n","category":"function"},{"location":"usage/#User-guide","page":"User guide","title":"User guide","text":"","category":"section"},{"location":"usage/#Installation","page":"User guide","title":"Installation","text":"","category":"section"},{"location":"usage/","page":"User guide","title":"User guide","text":"NeuralFieldEq.jl requires Julia version 1.5 or greater. You can install Julia here. Once installation is complete, open a Julia REPL and run the following code to install the package:","category":"page"},{"location":"usage/","page":"User guide","title":"User guide","text":"using Pkg\r\nPkg.add(\"NeuralFieldEq\")","category":"page"},{"location":"usage/#Dependencies","page":"User guide","title":"Dependencies","text":"","category":"section"},{"location":"usage/","page":"User guide","title":"User guide","text":"The package will install the following dependencies FFTW.jl, Distributions.jl and LinearAlgebra.jl.","category":"page"},{"location":"examples/#Examples","page":"Examples","title":"Examples","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"In this section we will address some examples to show the versatility of the package. From setting the neural field to preparing the equation to be computed, as well handling the solutions in order to facilitate the study and interpretation of it.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"The solver is divided into three steps:","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Introduce the parameters and functions using the structures Input1D or Input2D;\nPre-process the NFE using the function probNFE;\nSolve the equation using the function solveNFE at time instants chosen by the user, with or without noise.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"With respect to the structures Input1D and Input2D, they are needed to wrap the inputs needed to define our NFE. They have the following order:","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"α  :: AbstractFloat: Decay rate\nv  :: AbstractFloat: Axonal speed\nV0 :: fV0          : Initial condition (constant or a function)\nL  :: Number       : Domain's length\nN  :: Integer      : Number of spatial nodes\nT  :: AbstractFloat: Time span\nn  :: Integer      : Number of time nodes\nI  :: fI           : External input function\nK  :: fK           : Connectivity function\nS  :: fS           : Firing rate function","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Remark 1: The function I, depending on the dimensionality of the domain, has to have x,t or x,y,t as its arguments. Function K has x or x,y. Function S with V.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Once we define our input structure, we can now pass as input to function probNFE, where the NFE is prepared to be solved using the function solveNFE.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Remark 2: Currently, to work with the non-delayed problem, the velocity to insert must satisfy the condition: vfracLsqrt2Delta t in 2D and vfracL2Delta t in 1D, meaning that in practice the user must specify a big velocity (ex.: 9999990)","category":"page"},{"location":"examples/#Example:","page":"Examples","title":"Example:","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"nfe  = Input1D(α,v,V0,L,N,T,n,I,K,S); # Wrap the inputs in structure Input1D\r\nprob = probNFE(nfe)                   # Pre-process the NFE to be computed\r\n\r\n# Solve the deterministic 1D problem\r\nVdet = solveNFE(prob,[t1,t2,t3]) # solution saved at t1, t2, and t3\r\n\r\n# Solve the stochastic 1D problem np times\r\n# ϵ level of additive noise, spatial correlation (0.1 default value)\r\nVsto = solveNFE(prob,[t1,t2,t3],ϵ,np,xi=0.1) # solution saved at t1, t2, and t3","category":"page"},{"location":"examples/#Deterministic-and-stochastic-example-in-1D","page":"Examples","title":"Deterministic and stochastic example in 1D","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"This example was adapted from [Kulikov et al. (2019)]","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using NeuralFieldEq\r\n# 1D neural field\r\n# Define function inputs, I, K and S\r\nI(x,t) = -2.89967 + 8.0*exp(-x^2/(2.0*3^2)) - 0.5\r\nK(x) = 2*exp(-0.08*sqrt(x^2))*(0.08*sin(pi*sqrt(x^2)/10)+cos(pi*sqrt(x^2)/10))\r\nS(V) = V<=0.0 ? 0.0 : 1.0 # Heaviside function \r\n\r\n# Define parameters\r\na  = 1.0  # Constant decay      \r\nv  = 5.0  # Finite axonal speed\r\nV0 = 0.0  # Initial condition\r\nL  = 100  # Domain length\r\nN  = 512  # Number of nodes to discretise space\r\nT  = 10.0 # Time span\r\nn  = 100  # Number of nodes to discretise time\r\n\r\nnfe_1d = Input1D(a,v,V0,L,N,T,n,I,K,S); # Wrap inputs in structure Input1D","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"The second step is to use the function probNFE to prepare the inputs to solve the equation and finally computing the solution using solveNFE.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"tj   = 0:0.2:T;          # Choose instants where the sol is saved\r\nprob = probNFE(nfe_1d)   # Prepare the data to solve the NFE\r\nV    = solveNFE(prob,tj) # Solve the equation and save at tj","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Also, the function probNFE prints useful information such as spatial and time step as well as the number of delay rings (if vfracL2Delta t the number of rings is 1).","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"If we want to address the stochastic case we simply need to type extra arguments in solveNFE.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"# Solve the stochastic equation 100 times\r\n# Noise magnitude: eps = 0.05. Correlation coefficient: xi = 0.1\r\nVsto  = solveNFE(prob,tj,0.05,100)      # xi default value 0.1\r\nVsto2 = solveNFE(prob,tj,0.05,100,0.15) # xi = 0.15","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"The variables obtained with solveNFE are equipped with practical features to handle the solutions and create plots.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using Plots\r\nV(1.0)      # Returns the deterministic solution at t=1.0\r\nVsto(10.0)  # Returns the mean stochastic solution at t=10.0\r\nVsto(5.0,4) # Returns the 4th trajectory at t=5.0\r\n\r\nx = V.x # Returns the spatial vector\r\nplot(x,[V_1D(5.0),Vsto_1D(5.0),Vsto_1D(5.0,4)],\r\n     xlabel=\"x\",\r\n     ylabel=\"Action potential\",\r\n     label=[\"Deterministic solution\"\r\n            \"Stochastic mean solution\"\r\n            \"4th trajectory\"])","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"<img src='../figs/plots1D.png' width=500><br>","category":"page"},{"location":"examples/#Influence-of-delay-in-the-solutions","page":"Examples","title":"Influence of delay in the solutions","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"Considering the previous example, we will now compare the delayed solution with the non-delayed one.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"# Setting the non-delayed neural field\r\nv_inf = 9999999.0\r\n\r\nnfe_1d_vinf = Input1D(a,v_inf,V0,L,N,T,n,I,K,S);\r\nprob_vinf   = probNFE(nfe_1d_vinf)\r\nV_vinf      = solveNFE(prob_vinf,tj)\r\n\r\n# Animate the delayed and non-delayed solutions\r\nanim = @animate for i = 1:length(tj)\r\n  p1 = plot(x,V(i),title=\"v=5. t=$(tj[i])\",ylims=(-9.3,16.7))\r\n  p2 = plot(x,V_vinf(i),title=\"v=inf. t=$(tj[i])\",ylims=(-9.3,16.7))\r\n  plot(p1,p2,size=(900,400))\r\nend\r\ngif(anim, \"bumps.gif\",fps=10)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"<img src='../figs/bumps.gif' width=500><br>","category":"page"},{"location":"examples/#Example-in-2D-space","page":"Examples","title":"Example in 2D space","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"This is a two-dimensional extension of the previous example, adapted from [Kulikova et al. (2019)]","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"# Example with the same parameters as in 1D\r\n# In 2D we have 2 spacial variables, x and y\r\nI_2d(x,y,t) = -2.89967 + 8.0*exp(-x^2-y^2/(2.0*3^2)) - 0.5\r\nK_2d(x,y)   = 2*exp(-0.08*sqrt(x^2+y^2))*(0.08*sin(pi*sqrt(x^2+y^2)/10)+cos(pi*sqrt(x^2+y^2)/10))\r\n\r\nnfe_2d  = Input2D(a,v,V0,L,N,T,n,I_2d,K_2d,S);\r\nprob_2d = probNFE(nfe_2d)\r\n\r\n# Compute the two-dimensional solutions\r\nV_2d    = solveNFE(prob_2d,tj)         # deterministic\r\nVsto_2d = solveNFE(prob_2d,tj,0.1,20)  # stochastic\r\n\r\n# Plotting\r\nx = V_2d.x; # Returns the spatial vector in x direction\r\ny = V_2d.y; # Returns the spatial vector in y direction\r\n\r\np1 = plot(x,y,V_2d(10.0),\r\n          title  = \"Deterministic equation at t=10\",\r\n          xlabel = \"x\",\r\n          ylabel = \"y\",\r\n          zlabel = \"Action potential\")\r\n\r\np2 = plot(x,y,Vsto_2d(10.0,17),\r\n          title  = \"17th path with eps=0.1 and xi=0.1 at t=10\",\r\n          xlabel = \"x\",\r\n          ylabel = \"y\",\r\n          zlabel = \"Action potential\")\r\nplot(p1,p2,size=(1000,500))","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"<img src='../figs/bumps2d.png' width=500><br>","category":"page"},{"location":"examples/#Examples-with-V0-as-a-function","page":"Examples","title":"Examples with V0 as a function","text":"","category":"section"},{"location":"examples/#D-example","page":"Examples","title":"1D example","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"This example was taken from section 2 of Laing et al. (2002) where an analytical stationary solution was derived.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using NeuralFieldEq, Plots\r\n\r\nfunction W(x)\r\n    if x != 0\r\n        return (((1-exp(-1.8*abs(x)))*(3.5/1.8) + (-1+exp(-1.52*abs(x)))*(3/1.52))*x)/abs(x)\r\n    else\r\n        return 0.0\r\n    end\r\nend\r\na2   = 2.28978\r\nsol_exact(x) = W(x) - W(x-a2)\r\n\r\nextInput(x,t) = 0.0\r\nkernel(x)     = 3.5*exp(-1.8*abs(x))-3*exp(-1.52*abs(x))\r\nfiringRate(V) = V<=0.0 ? 0.0 : 1.0\r\n\r\na  = 1.0\r\nv  = 90000.0   # This velocity satisfies the condition v>L/(2*Δt), thus we are considering the non-delayed problem\r\nV0 = sol_exact # The initial condition, V0, is a function\r\nL  = 20\r\nN  = 512\r\nT  = 20.0\r\nn  = 200\r\n\r\ninput = Input1D(a,v,V0,L,N,T,n,extInput,kernel,firingRate);\r\nprob  = probNFE(input)\r\nV     = solveNFE(prob,[0.2,1.0,5.0,10.0,20.0])         # Compute the deterministic solution\r\n\r\n# Plotting\r\nx = V.x\r\nplot(x,[V(10.0),sol_exact.(x)],\r\n     labels=[\"Numerical solution\" \"Exact solution\"],\r\n     legend=:bottomright,\r\n     title=\"Stationary problem at t=10\",\r\n     xlabel=\"x\",\r\n     ylabel=\"V(x)\")","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"<img src='../figs/stasolution1d.png' width=500><br>","category":"page"},{"location":"examples/#D-example-2","page":"Examples","title":"2D example","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"In this example we will adapt a 2D neural field taken from section 8 of Laing et al. (2002), where the initial condition is not a constant, but a function of x and y, more specifically in the following form:","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"begincases\r\n    V_0(xy) = 5 textif -4x56 land -12y4 \r\n    V_0(xy) = 0 textotherwise\r\nend","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using NeuralFieldEq, Plots\r\n\r\n# Define functions\r\nI(x,y,t) = 0\r\nW(x,y)   = exp(-0.45*sqrt(x^2+y^2))*(0.45*sin(sqrt(x^2+y^2))+cos(sqrt(x^2+y^2))) # Connectivity function\r\nf(V)     = 2.0*exp(-0.1/((V-1.5)^2))*convert(Float64,V>1.5) # Firing rate function (an exponential times a heaviside)\r\n\r\n# Define parameters\r\na  = 1.0     # Temporal decay of the synapse\r\nv  = 99999.0 # Finite axonal speed\r\nL  = 40      # Domain length. [-20,20]\r\nN  = 50      # Number of nodes to discretise space\r\nT  = 4.0     # Time span\r\nn  = 200     # Number of nodes to discretise time\r\ntj = [1.0,2.0,3.0,4.0]\r\n\r\n# Initial condition\r\nfunction V_0(x,y)\r\n    if (x > -4.0 && x < 5.6) && (y > -12.0 && y < 4.0)\r\n        return 5.0\r\n    else\r\n        return 0.0\r\n    end\r\nend\r\n\r\nnfe  = Input2D(a,v,V_0,L,N,T,n,I,W,f);\r\nprob = probNFE(nfe)\r\nV    = solveNFE(prob,tj)\r\n\r\n# Plotting\r\nx = V.x\r\ny = V.y\r\nplot(x,y,V(),st=:surface,\r\n     xlabel = \"x\",\r\n     ylabel = \"y\",\r\n     zlabel = \"V(x,y)\",\r\n     title  = \"Example of section 8 of Laing et al. (2002)\")","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"<img src='../figs/bumps2d_laing.png' width=500><br>","category":"page"},{"location":"examples/#Breather-type-instabilities","page":"Examples","title":"Breather type instabilities","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"The authors in Hutt & Rougier 2013 successfully induced breather instabilities using only the axonal speed. Here we use an adapted neural field in order to induce the same type of instabilities.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"First is presented a stable field (with v=infty):","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using NeuralFieldEq, Plots\r\n\r\nI(x,y,t) = (5.0/(32.0*pi))*exp(-(x^2+y^2)/32.0)\r\nfunction K(x,y)\r\n    A = 20.0/(10.0*pi)\r\n    B = 14.0/(18.0*pi)\r\n    return A*exp(-sqrt(x^2+y^2)) - B*exp(-sqrt(x^2+y^2)/3.0)\r\nend\r\nS(V) = V<=0.005 ? 0.0 : 1.0 # H(V-th)\r\n\r\na  = 1.0\r\nv  = 999999.0\r\nV0 = 0.0\r\nL  = 20\r\nN  = 256\r\nT  = 10.0\r\nn  = 200\r\n\r\nnfe  = Input2D(a,v,V0,L,N,T,n,I,K,S);\r\nprob = probNFE(nfe)\r\n\r\n# Solve the neural field equation\r\ntj = 0:0.2:T;\r\nV  = solveNFE(prob,tj)\r\n\r\n# Plots\r\nminmax_V = zeros(2,length(tj))\r\nfor i = 1:length(tj)\r\n    minmax_V[1,i] = minimum(V(i))\r\n    minmax_V[2,i] = maximum(V(i))\r\nend\r\n\r\n# Animate solution\r\nx = V.x\r\ny = V.y\r\nanim = @animate for i = 1:length(tj)\r\n  p1 = plot(x,y,V(i),st=:surface,title=\"t=$(tj[i])\",color=:balance,zlims=(-0.43,0.54))\r\n  p2 = plot(tj,[minmax_V[1,i],minmax_V[2,i]],label=[minimum maximum])\r\n  plot(p1,p2)\r\nend\r\ngif(anim, \"vinf_breather.gif\",fps=10)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"<img src='../figs/vinf_breather.gif' width=500><br>","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Next we use the finite velocities v=3 and v=5:","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"nfe_v5  = Input2D(a,5.0,V0,L,N,80.0,1600,I,K,S);\r\nnfe_v3  = Input2D(a,3.0,V0,L,N,80.0,1600,I,K,S);\r\nprob_v5 = probNFE(nfe_v5)\r\nprob_v3 = probNFE(nfe_v3)\r\n\r\n# Solve the neural field equation\r\nV_v5 = solveNFE(prob_v5,tj)\r\nV_v3 = solveNFE(prob_v3,tj)\r\n\r\n# Plotting\r\n# Animate the delayed solutions\r\nanim = @animate for i = 1:length(tj)\r\n  p1 = plot(x,y,V_v5(i),st=:surface,title=\"v=5. t=$(tj[i])\",color=:balance,zlims=(-2.8,0.95))\r\n  p2 = plot(x,y,V_v3(i),st=:surface,title=\"v=3. t=$(tj[i])\",color=:balance,zlims=(-2.8,0.95))\r\n  plot(p1,p2)\r\nend\r\ngif(anim, \"v5v3_breather.gif\",fps=10)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"<img src='../figs/v5v3_breather.gif' width=500><br>","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"As we can see, the field oscillates in the first seconds of the simulation and lower the velocity the more time the neural field oscillates. Indeed, if we consider v=2 the field is unstable for all time span considered","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"nfe_v2  = Input2D(a,2.0,V0,L,N,100.0,2000,I,K,S);\r\nprob_v2 = probNFE(nfe_v2)\r\nV_v2    = solveNFE(prob_v2,tj)\r\n\r\n# Plotting\r\nminmax_Vv2 = zeros(2,length(tj))\r\nfor i = 1:length(tj)\r\n    minmax_Vv2[1,i] = minimum(V_v2(i))\r\n    minmax_Vv2[2,i] = maximum(V_v2(i))\r\nend\r\n\r\n# Animate solution\r\nanim = @animate for i = 1:length(tj)\r\n  p1 = plot(x,y,V_v2(i),st=:surface,title=\"t=$(tj[i])\",color=:balance,zlims=(-3.6,0.95))\r\n  p2 = plot(tj,[minmax_Vv2[1,i],minmax_Vv2[2,i]],label=[minimum maximum])\r\n  plot(p1,p2,size=(900,400))\r\nend\r\ngif(anim, \"v2_breather.gif\",fps=10)","category":"page"},{"location":"#NeuralFieldEq.jl","page":"Home","title":"NeuralFieldEq.jl","text":"","category":"section"},{"location":"#Table-of-Contents","page":"Home","title":"Table of Contents","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"index.md\", \"usage.md\", \"examples.md\", \"apidocs.md\"]\r\nDepth = 2","category":"page"},{"location":"","page":"Home","title":"Home","text":"note: Note\nThis package is intended for both experienced researchers and graduate students who are taking their first steps, in this last case is recommended that the user is familiarised with the basics of Neural Field Equations (NFE). See Amari 1977 and Bressloff 2011.","category":"page"},{"location":"#About","page":"Home","title":"About","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The numerical method implemented in NeuralFieldEq.jl was developed within the scope of the thesis Sequeira 2021 under the supervision of professor Pedro M. Lima. The method combined the novel numerical scheme published originally by Hutt & Rougier 2013 for delayed NFE in the context of the stochastic scenario presented by Kuehn & Riedler 2014 where the convergence of spectral methods was proved in stochastic neural fields with additive white noise and spatial correlation.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Hence, this package aims to numerically approximate solutions of Neural Field Equations in one- or two-dimensional spaces, with or without delay and in the deterministic or stochastic scenarios described below.","category":"page"},{"location":"#Introducing-Neural-Field-Equations","page":"Home","title":"Introducing Neural Field Equations","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Due to the large concentration of neurons in the cerebral cortex (approx 10^10) distributed along 2500cm^2 of surface area with 28mm of depth, this layer of the brain can be viewed as a virtual 2D continuum space. The NFE arose from the necessity of modelling the neuronal activity present in cortical tissues. Amari derived the following equation","category":"page"},{"location":"","page":"Home","title":"Home","text":"alpha fracpartial Vpartial tleft(mathbfxtright) = Ileft(mathbfxtright) - Vleft(mathbfxtright) + int Kleft(mathbfx-mathbfy_2right)SbigVleft(mathbfytright)bigd^2mathbfy","category":"page"},{"location":"","page":"Home","title":"Home","text":"where V(mathbfxt) is the membrane potential of a neuron located at mathbfx in Omega at instant t; I(mathbfxt) is the external input applied to the neural field; Kleft(mathbfx-mathbfy_2right) is the average strength of connectivity between neurons located at points mathbfx and mathbfy. K comprises the type of the synapse, when the coupling is positive (negative) the synapses are excitatory (inhibitory); S(V) is the firing rate function, a monotonically non-decreasing function that converts the potential to the respective firing rate result; And alpha is the constant decay rate.","category":"page"},{"location":"#NFE-with-finite-transmission-speed-(delay)","page":"Home","title":"NFE with finite transmission speed (delay)","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The equation written above do not consider the finite velocity propagation of the action potentials, depending on the cortical region this assumption can be biological inaccurate since the axonal speed can vary between 100ms to 1ms. Thus, in order to work with a more realistic model the neural field equation can be written taking into consideration the time spent by the stimulus to travel from neurons at y to the ones at x:","category":"page"},{"location":"","page":"Home","title":"Home","text":"alpha fracpartial Vpartial tleft(mathbfxtright) = Ileft(mathbfxtright) - Vleft(mathbfxtright) + int Kleft(mathbfx-mathbfy_2right)SbigVleft(mathbfyt-dleft(mathbfxmathbfyright)right)bigd^2mathbfy","category":"page"},{"location":"","page":"Home","title":"Home","text":"with d=fracmathbfx-mathbfy_2v representing the delay, which is assumed to only depend on the distance and on the transmission speed v. Remark: If v is sufficiently high, d can be neglected and the last equation is reduced to the non-delayed equation.","category":"page"},{"location":"#Sotchastic-NFE-with-delay","page":"Home","title":"Sotchastic NFE with delay","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"One of the many endeavours to, iteratively, improve Neural Field models is to take into consideration the noisy neuronal interactions, generated by the stochastic behaviour of the neuron or from extrinsic noise sources that can arise from inputs of other neuronal networks. Kuehn & Riedler 2014 studied a neural field model with additive white noise and v=infty. If we add the delay function presented above we end up with the following model:","category":"page"},{"location":"","page":"Home","title":"Home","text":"alpha dVleft(mathbfxtright) = leftIleft(mathbfxtright) - Vleft(mathbfxtright) + int_OmegaKleft(mathbfx-mathbfy_2right)SbigVleft(mathbfyt-dleft(mathbfxmathbfyright)right)bigd^2mathbfyrightdt + epsilon dWleft(mathbfxtright)","category":"page"},{"location":"","page":"Home","title":"Home","text":"with epsilon the additive noise level and W is a Q-Wiener process.","category":"page"},{"location":"#References","page":"Home","title":"References","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Amari, Shun-ichi. (1977). Dynamic of pattern formation in lateral-inhibition type neural fields. Biological cybernetics. 27. 77-87. 10.1007/BF00337259.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Bressloff, Paul. (2011). Spatiotemporal dynamics of continuum neural fields. Journal of Physics A: Mathematical and Theoretical. 45. 033001. 10.1088/1751-8113/45/3/033001.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Hutt, Axel & Rougier, Nicolas. (2013). Numerical Simulation Scheme of One- and Two Dimensional Neural Fields Involving Space-Dependent Delays. 10.1007/978-3-642-54593-1_6.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Laing, Carlo & Troy, William & Gutkin, Boris & Ermentrout, Bard. (2002). Multiple Bumps in a Neuronal Model of Working Memory. SIAM Journal on Applied Mathematics. 63. 10.1137/S0036139901389495. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Kuehn, Christian & Riedler, Martin. (2014). Large Deviations for Nonlocal Stochastic Neural Fields. Journal of mathematical neuroscience. 4. 1. 10.1186/2190-8567-4-1.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Kulikov, Gennady & Kulikova, Maria & Lima, Pedro. (2019). Numerical Simulation of Neural Fields with Finite Transmission Speed and Random Disturbance. 644-649. 10.1109/ICSTCC.2019.8885972.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Kulikova, Maria & Kulikov, Gennady & Lima, Pedro. (2019). Effective Numerical Solution to Two-Dimensional Stochastic Neural Field Equations. 650-655. 10.1109/ICSTCC.2019.8885614. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Sequeira, Tiago (2021). Numerical Simulations of One- and Two-dimensional Stochastic Neural Field Equations with Delay - MSc in Industrial Mathematics dissertation.","category":"page"}]
}
